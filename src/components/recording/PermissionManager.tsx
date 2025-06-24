
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, X, AlertCircle } from 'lucide-react';

interface Permission {
  name: string;
  status: 'granted' | 'denied' | 'prompt';
  required: boolean;
}

export const PermissionManager = () => {
  const [permissions, setPermissions] = useState<Permission[]>([
    { name: 'Screen Recording', status: 'prompt', required: true },
    { name: 'Microphone', status: 'prompt', required: true },
    { name: 'Camera', status: 'prompt', required: false },
  ]);

  const checkPermissions = async () => {
    try {
      // Check screen capture (this will always be prompt until user action)
      const screenPermission = 'prompt';
      
      // Check microphone
      const micPermission = await navigator.permissions.query({ name: 'microphone' as PermissionName });
      
      // Check camera
      const cameraPermission = await navigator.permissions.query({ name: 'camera' as PermissionName });

      setPermissions([
        { name: 'Screen Recording', status: screenPermission as any, required: true },
        { name: 'Microphone', status: micPermission.state as any, required: true },
        { name: 'Camera', status: cameraPermission.state as any, required: false },
      ]);
    } catch (error) {
      console.error('Error checking permissions:', error);
    }
  };

  useEffect(() => {
    checkPermissions();
  }, []);

  const requestPermissions = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
      checkPermissions();
    } catch (error) {
      console.error('Permission denied:', error);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'granted':
        return <Check className="w-4 h-4 text-green-500" />;
      case 'denied':
        return <X className="w-4 h-4 text-red-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
    }
  };

  const allRequiredGranted = permissions
    .filter(p => p.required)
    .every(p => p.status === 'granted');

  return (
    <Card className="bg-slate-900/50 backdrop-blur-xl border-white/10 p-6">
      <h3 className="text-white font-semibold mb-4">Permissions</h3>
      
      <div className="space-y-3">
        {permissions.map((permission) => (
          <div key={permission.name} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {getStatusIcon(permission.status)}
              <span className="text-slate-200">{permission.name}</span>
              {permission.required && (
                <span className="text-xs text-cyan-400 bg-cyan-400/10 px-2 py-1 rounded">
                  Required
                </span>
              )}
            </div>
            <span className="text-sm text-slate-400 capitalize">
              {permission.status}
            </span>
          </div>
        ))}
      </div>

      {!allRequiredGranted && (
        <Button
          onClick={requestPermissions}
          className="w-full mt-4 bg-cyan-500 hover:bg-cyan-600 text-white"
        >
          Grant Permissions
        </Button>
      )}
    </Card>
  );
};
