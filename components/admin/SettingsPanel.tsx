/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { 
  Key, 
  Save, 
  RefreshCw, 
  Eye, 
  EyeOff, 
  AlertTriangle,
  CheckCircle,
  Settings,
  Database,
  Cloud,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import toast from 'react-hot-toast';

interface ApiKey {
  key: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  placeholder: string;
}

const SettingsPanel: React.FC = () => {
  const [settings, setSettings] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set());
  const [formData, setFormData] = useState<{ [key: string]: string }>({});

  const apiKeys: ApiKey[] = [
    {
      key: 'GROQ_API_KEY',
      label: 'Groq API Key',
      description: 'API key for Groq Llama-3.3-70B story generation',
      icon: <Zap className="w-5 h-5" />,
      category: 'AI Services',
      placeholder: 'gsk_...'
    },
    {
      key: 'STABILITY_API_KEY',
      label: 'Stability AI API Key',
      description: 'API key for Stability AI SD3.5-Large-Turbo image generation',
      icon: <Zap className="w-5 h-5" />,
      category: 'AI Services',
      placeholder: 'sk-...'
    },
    {
      key: 'CLOUDINARY_CLOUD_NAME',
      label: 'Cloudinary Cloud Name',
      description: 'Your Cloudinary cloud name for image storage',
      icon: <Cloud className="w-5 h-5" />,
      category: 'Storage',
      placeholder: 'your-cloud-name'
    },
    {
      key: 'CLOUDINARY_API_KEY',
      label: 'Cloudinary API Key',
      description: 'API key for Cloudinary image storage service',
      icon: <Cloud className="w-5 h-5" />,
      category: 'Storage',
      placeholder: '123456789012345'
    },
    {
      key: 'CLOUDINARY_API_SECRET',
      label: 'Cloudinary API Secret',
      description: 'API secret for Cloudinary image storage service',
      icon: <Cloud className="w-5 h-5" />,
      category: 'Storage',
      placeholder: 'your-api-secret'
    }
  ];

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/admin/settings');
      setSettings(response.data.data);
      
      // Initialize form data with empty strings for editing
      const initialFormData: { [key: string]: string } = {};
      apiKeys.forEach(apiKey => {
        initialFormData[apiKey.key] = '';
      });
      setFormData(initialFormData);
    } catch (error: any) {
      toast.error('Failed to fetch settings');
      console.error('Settings fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateApiKey = async (key: string, value: string) => {
    if (!value.trim()) {
      toast.error('Please enter a value');
      return;
    }

    try {
      setSaving(key);
      const response = await axios.post('/api/admin/settings', {
        key,
        value: value.trim()
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setFormData(prev => ({ ...prev, [key]: '' }));
        await fetchSettings(); // Refresh settings
      } else {
        toast.error(response.data.error || 'Failed to update setting');
      }
    } catch (error: any) {
      const message = error?.response?.data?.error || 'Failed to update setting';
      toast.error(message);
    } finally {
      setSaving(null);
    }
  };

  const toggleVisibility = (key: string) => {
    setVisibleKeys(prev => {
      const newSet = new Set(prev);
      if (newSet.has(key)) {
        newSet.delete(key);
      } else {
        newSet.add(key);
      }
      return newSet;
    });
  };

  const handleInputChange = (key: string, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const getStatusColor = (value: string) => {
    if (value === 'Not set') return 'text-red-400';
    if (value === 'Set') return 'text-green-400';
    if (value.startsWith('***')) return 'text-green-400';
    return 'text-yellow-400';
  };

  const getStatusIcon = (value: string) => {
    if (value === 'Not set') return <AlertTriangle className="w-4 h-4 text-red-400" />;
    return <CheckCircle className="w-4 h-4 text-green-400" />;
  };

  if (loading) {
    return (
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-600 rounded w-1/4"></div>
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="h-16 bg-gray-600 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Group API keys by category
  const groupedKeys = apiKeys.reduce((acc, apiKey) => {
    if (!acc[apiKey.category]) {
      acc[apiKey.category] = [];
    }
    acc[apiKey.category].push(apiKey);
    return acc;
  }, {} as { [category: string]: ApiKey[] });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Settings className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">API Settings</h2>
              <p className="text-gray-400 text-sm">Manage your API keys and configuration</p>
            </div>
          </div>
          <Button
            onClick={fetchSettings}
            variant="outline"
            size="sm"
            className="border-gray-600 text-gray-300 hover:text-white"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Warning */}
      <div className="bg-yellow-900/20 border border-yellow-700/50 rounded-2xl p-4">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5" />
          <div>
            <h3 className="text-yellow-400 font-medium">Important Security Notice</h3>
            <p className="text-yellow-300/80 text-sm mt-1">
              API keys are sensitive information. Changes require application restart to take full effect. 
              Never share these keys publicly.
            </p>
          </div>
        </div>
      </div>

      {/* API Keys by Category */}
      {Object.entries(groupedKeys).map(([category, keys]) => (
        <div key={category} className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-700/50">
            <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
              {category === 'AI Services' && <Zap className="w-5 h-5" />}
              {category === 'Storage' && <Cloud className="w-5 h-5" />}
              {category === 'Database' && <Database className="w-5 h-5" />}
              <span>{category}</span>
            </h3>
          </div>
          
          <div className="p-6 space-y-6">
            {keys.map((apiKey) => (
              <div key={apiKey.key} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-700/50 rounded-lg flex items-center justify-center text-purple-400">
                      {apiKey.icon}
                    </div>
                    <div>
                      <h4 className="text-white font-medium">{apiKey.label}</h4>
                      <p className="text-gray-400 text-sm">{apiKey.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(settings[apiKey.key] || 'Not set')}
                    <span className={`text-sm font-medium ${getStatusColor(settings[apiKey.key] || 'Not set')}`}>
                      {settings[apiKey.key] || 'Not set'}
                    </span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <div className="flex-1 relative">
                    <Input
                      type={visibleKeys.has(apiKey.key) ? 'text' : 'password'}
                      placeholder={`Enter new ${apiKey.label.toLowerCase()}`}
                      value={formData[apiKey.key] || ''}
                      onChange={(e) => handleInputChange(apiKey.key, e.target.value)}
                      className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => toggleVisibility(apiKey.key)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      {visibleKeys.has(apiKey.key) ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  <Button
                    onClick={() => updateApiKey(apiKey.key, formData[apiKey.key])}
                    disabled={saving === apiKey.key || !formData[apiKey.key]?.trim()}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    {saving === apiKey.key ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <Save className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Read-only Settings */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-700/50">
          <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
            <Key className="w-5 h-5" />
            <span>System Configuration (Read-only)</span>
          </h3>
        </div>
        
        <div className="p-6 space-y-4">
          {['NEXTAUTH_SECRET', 'MONGODB_URI'].map((key) => (
            <div key={key} className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <Database className="w-5 h-5 text-blue-400" />
                <span className="text-white font-medium">{key}</span>
              </div>
              <div className="flex items-center space-x-2">
                {getStatusIcon(settings[key] || 'Not set')}
                <span className={`text-sm font-medium ${getStatusColor(settings[key] || 'Not set')}`}>
                  {settings[key] || 'Not set'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;