
import { api } from './api';
import { UploadProgress, UploadError } from '@/types/api';

export class FileUploadManager {
  private static readonly CHUNK_SIZE = 1024 * 1024; // 1MB chunks
  private uploads = new Map<string, UploadState>();

  async uploadFile(
    file: File,
    sessionId: string,
    onProgress?: (progress: UploadProgress) => void,
    onError?: (error: UploadError) => void
  ): Promise<void> {
    const chunks = this.createChunks(file);
    const totalChunks = chunks.length;
    
    const uploadState: UploadState = {
      file,
      sessionId,
      chunks,
      completedChunks: new Set(),
      failedChunks: new Map(),
      isComplete: false,
      isCancelled: false,
    };

    this.uploads.set(sessionId, uploadState);

    try {
      await this.uploadChunks(uploadState, onProgress, onError);
    } catch (error) {
      console.error('Upload failed:', error);
      throw error;
    } finally {
      this.uploads.delete(sessionId);
    }
  }

  private createChunks(file: File): Blob[] {
    const chunks: Blob[] = [];
    let start = 0;

    while (start < file.size) {
      const end = Math.min(start + FileUploadManager.CHUNK_SIZE, file.size);
      chunks.push(file.slice(start, end));
      start = end;
    }

    return chunks;
  }

  private async uploadChunks(
    uploadState: UploadState,
    onProgress?: (progress: UploadProgress) => void,
    onError?: (error: UploadError) => void
  ): Promise<void> {
    const { chunks, sessionId } = uploadState;
    const concurrentUploads = 3;
    const uploadPromises: Promise<void>[] = [];

    for (let i = 0; i < chunks.length; i += concurrentUploads) {
      const batch = chunks.slice(i, i + concurrentUploads);
      const batchPromises = batch.map((chunk, batchIndex) =>
        this.uploadChunk(
          chunk,
          i + batchIndex,
          chunks.length,
          uploadState,
          onProgress,
          onError
        )
      );

      uploadPromises.push(...batchPromises);
      
      // Wait for current batch before starting next
      await Promise.all(batchPromises);
    }

    await Promise.all(uploadPromises);
    uploadState.isComplete = true;
  }

  private async uploadChunk(
    chunk: Blob,
    chunkIndex: number,
    totalChunks: number,
    uploadState: UploadState,
    onProgress?: (progress: UploadProgress) => void,
    onError?: (error: UploadError) => void
  ): Promise<void> {
    const { sessionId, completedChunks, failedChunks } = uploadState;
    const maxRetries = 3;
    let retryCount = 0;

    while (retryCount < maxRetries) {
      if (uploadState.isCancelled) {
        throw new Error('Upload cancelled');
      }

      try {
        await api.upload.chunk(chunk, chunkIndex, totalChunks, sessionId);
        
        completedChunks.add(chunkIndex);
        failedChunks.delete(chunkIndex);

        // Report progress
        if (onProgress) {
          const progress: UploadProgress = {
            sessionId,
            chunkIndex,
            totalChunks,
            percentage: (completedChunks.size / totalChunks) * 100,
            bytesUploaded: completedChunks.size * FileUploadManager.CHUNK_SIZE,
            totalBytes: uploadState.file.size,
          };
          onProgress(progress);
        }

        return;
      } catch (error) {
        retryCount++;
        console.error(`Chunk ${chunkIndex} failed (attempt ${retryCount}):`, error);

        if (retryCount >= maxRetries) {
          const uploadError: UploadError = {
            sessionId,
            chunkIndex,
            error: error instanceof Error ? error.message : 'Unknown error',
            retryable: retryCount < maxRetries,
          };

          failedChunks.set(chunkIndex, uploadError);
          
          if (onError) {
            onError(uploadError);
          }
          
          throw error;
        }

        // Exponential backoff
        await new Promise(resolve => 
          setTimeout(resolve, Math.pow(2, retryCount) * 1000)
        );
      }
    }
  }

  async resumeUpload(
    sessionId: string,
    onProgress?: (progress: UploadProgress) => void,
    onError?: (error: UploadError) => void
  ): Promise<void> {
    const uploadState = this.uploads.get(sessionId);
    if (!uploadState) {
      throw new Error('Upload session not found');
    }

    uploadState.isCancelled = false;
    
    // Retry failed chunks
    const failedChunkIndices = Array.from(uploadState.failedChunks.keys());
    for (const chunkIndex of failedChunkIndices) {
      const chunk = uploadState.chunks[chunkIndex];
      await this.uploadChunk(
        chunk,
        chunkIndex,
        uploadState.chunks.length,
        uploadState,
        onProgress,
        onError
      );
    }
  }

  cancelUpload(sessionId: string): void {
    const uploadState = this.uploads.get(sessionId);
    if (uploadState) {
      uploadState.isCancelled = true;
    }
  }

  getUploadProgress(sessionId: string): UploadProgress | null {
    const uploadState = this.uploads.get(sessionId);
    if (!uploadState) return null;

    return {
      sessionId,
      chunkIndex: uploadState.completedChunks.size,
      totalChunks: uploadState.chunks.length,
      percentage: (uploadState.completedChunks.size / uploadState.chunks.length) * 100,
      bytesUploaded: uploadState.completedChunks.size * FileUploadManager.CHUNK_SIZE,
      totalBytes: uploadState.file.size,
    };
  }
}

interface UploadState {
  file: File;
  sessionId: string;
  chunks: Blob[];
  completedChunks: Set<number>;
  failedChunks: Map<number, UploadError>;
  isComplete: boolean;
  isCancelled: boolean;
}

export const fileUploadManager = new FileUploadManager();
