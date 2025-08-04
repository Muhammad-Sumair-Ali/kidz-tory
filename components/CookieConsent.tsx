"use client";
import { useEffect, useState, useCallback } from "react";
import { Shield, Cookie, X, Settings, Check, XIcon } from "lucide-react";

declare global {
  interface Window {
    gtag?: (
      command: string,
      action: string,
      parameters?: Record<string, string>
    ) => void;
  }
}

type ConsentStatus = "accepted" | "rejected" | "partial" | null;

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
}

const COOKIE_CONSENT_KEY = "kidztory_cookie_consent";
const COOKIE_PREFERENCES_KEY = "kidztory_cookie_preferences";

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, 
    analytics: false,
    marketing: false,
    functional: false,
  });

  useEffect(() => {
    try {
      const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
      const savedPreferences = localStorage.getItem(COOKIE_PREFERENCES_KEY);
      
      if (savedPreferences) {
        setPreferences(JSON.parse(savedPreferences));
      }
      
      if (!consent) {
        const timer = setTimeout(() => setShowBanner(true), 100);
        return () => clearTimeout(timer);
      }
    } catch (error) {
      console.error("Error reading cookie consent:", error);
      setShowBanner(true);
    }
  }, []);

  const updateGtagConsent = useCallback((prefs: CookiePreferences) => {
    if (typeof window !== "undefined" && window.gtag) {
      try {
        window.gtag("consent", "update", {
          ad_storage: prefs.marketing ? "granted" : "denied",
          analytics_storage: prefs.analytics ? "granted" : "denied",
          functionality_storage: prefs.functional ? "granted" : "denied",
          security_storage: "granted", 
        });
      } catch (error) {
        console.error("Error updating gtag consent:", error);
      }
    }
  }, []);

  const savePreferences = useCallback((prefs: CookiePreferences, status: ConsentStatus) => {
    try {
      localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(prefs));
      localStorage.setItem(COOKIE_CONSENT_KEY, status || "partial");
      updateGtagConsent(prefs);
    } catch (error) {
      console.error("Error saving cookie preferences:", error);
    }
  }, [updateGtagConsent]);

  const handleAcceptAll = useCallback(async () => {
    setIsLoading(true);
    const allAccepted: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
    };
    
    setPreferences(allAccepted);
    savePreferences(allAccepted, "accepted");
    
    await new Promise(resolve => setTimeout(resolve, 300));
    setIsLoading(false);
    setShowBanner(false);
    setShowPreferences(false);
  }, [savePreferences]);

  const handleRejectAll = useCallback(async () => {
    setIsLoading(true);
    const onlyNecessary: CookiePreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false,
    };
    
    setPreferences(onlyNecessary);
    savePreferences(onlyNecessary, "rejected");
    
    await new Promise(resolve => setTimeout(resolve, 300));
    setIsLoading(false);
    setShowBanner(false);
    setShowPreferences(false);
  }, [savePreferences]);

  const handleSavePreferences = useCallback(async () => {
    setIsLoading(true);
    savePreferences(preferences, "partial");
    
    await new Promise(resolve => setTimeout(resolve, 300));
    setIsLoading(false);
    setShowBanner(false);
    setShowPreferences(false);
  }, [preferences, savePreferences]);

  const handlePreferenceChange = useCallback((key: keyof CookiePreferences, value: boolean) => {
    if (key === "necessary") return;
    setPreferences(prev => ({ ...prev, [key]: value }));
  }, []);

  if (!showBanner) return null;

  return (
    <>
      {/* Main Cookie Banner */}
      <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-lg z-50 bg-gray-800/95 backdrop-blur-md border border-gray-700/50 text-white rounded-2xl shadow-2xl transition-all duration-300 animate-in slide-in-from-bottom-4">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Cookie className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Cookie Preferences</h3>
                <p className="text-sm text-gray-400">We respect your privacy</p>
              </div>
            </div>
            <button
              onClick={() => setShowBanner(false)}
              className="text-gray-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-gray-700/50"
              aria-label="Close cookie banner"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Content */}
          <div className="mb-6">
            <p className="text-sm text-gray-300 leading-relaxed mb-3">
              We use cookies to enhance your experience, provide analytics, and improve our services. 
              You can customize your preferences or accept all cookies.
            </p>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <Shield className="w-3 h-3" />
              <span>Your data is secure and never sold to third parties</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleAcceptAll}
              disabled={isLoading}
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Check className="w-4 h-4" />
              )}
              Accept All
            </button>
            
            <button
              onClick={() => setShowPreferences(true)}
              className="flex-1 bg-gray-700/50 hover:bg-gray-600/50 border border-gray-600 text-gray-300 hover:text-white px-4 py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Settings className="w-4 h-4" />
              Customize
            </button>
            
            <button
              onClick={handleRejectAll}
              disabled={isLoading}
              className="flex-1 bg-transparent hover:bg-gray-700/30 border border-gray-600 text-gray-400 hover:text-white px-4 py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-gray-400/30 border-t-gray-400 rounded-full animate-spin" />
              ) : (
                <XIcon className="w-4 h-4" />
              )}
              Reject All
            </button>
          </div>
        </div>
      </div>

      {/* Preferences Modal */}
      {showPreferences && (
        <div className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-gray-800/95 backdrop-blur-md border border-gray-700/50 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <Settings className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Cookie Preferences</h2>
                    <p className="text-sm text-gray-400">Manage your cookie settings</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowPreferences(false)}
                  className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-gray-700/50"
                  aria-label="Close preferences"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Cookie Categories */}
              <div className="space-y-4 mb-6">
                {/* Necessary Cookies */}
                <div className="bg-gray-700/30 rounded-xl p-4 border border-gray-600/50">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-white">Necessary Cookies</h3>
                    <div className="w-12 h-6 bg-green-600 rounded-full flex items-center justify-end px-1">
                      <div className="w-4 h-4 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400">
                    Essential for the website to function properly. These cannot be disabled.
                  </p>
                </div>

                {/* Analytics Cookies */}
                <div className="bg-gray-700/30 rounded-xl p-4 border border-gray-600/50">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-white">Analytics Cookies</h3>
                    <button
                      onClick={() => handlePreferenceChange("analytics", !preferences.analytics)}
                      className={`w-12 h-6 rounded-full flex items-center transition-all duration-300 ${
                        preferences.analytics ? "bg-purple-600 justify-end" : "bg-gray-600 justify-start"
                      } px-1`}
                    >
                      <div className="w-4 h-4 bg-white rounded-full"></div>
                    </button>
                  </div>
                  <p className="text-sm text-gray-400">
                    Help us understand how visitors interact with our website to improve user experience.
                  </p>
                </div>

                {/* Marketing Cookies */}
                <div className="bg-gray-700/30 rounded-xl p-4 border border-gray-600/50">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-white">Marketing Cookies</h3>
                    <button
                      onClick={() => handlePreferenceChange("marketing", !preferences.marketing)}
                      className={`w-12 h-6 rounded-full flex items-center transition-all duration-300 ${
                        preferences.marketing ? "bg-purple-600 justify-end" : "bg-gray-600 justify-start"
                      } px-1`}
                    >
                      <div className="w-4 h-4 bg-white rounded-full"></div>
                    </button>
                  </div>
                  <p className="text-sm text-gray-400">
                    Used to deliver personalized advertisements and measure their effectiveness.
                  </p>
                </div>

                {/* Functional Cookies */}
                <div className="bg-gray-700/30 rounded-xl p-4 border border-gray-600/50">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-white">Functional Cookies</h3>
                    <button
                      onClick={() => handlePreferenceChange("functional", !preferences.functional)}
                      className={`w-12 h-6 rounded-full flex items-center transition-all duration-300 ${
                        preferences.functional ? "bg-purple-600 justify-end" : "bg-gray-600 justify-start"
                      } px-1`}
                    >
                      <div className="w-4 h-4 bg-white rounded-full"></div>
                    </button>
                  </div>
                  <p className="text-sm text-gray-400">
                    Enable enhanced functionality and personalization, such as remembering your preferences.
                  </p>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleSavePreferences}
                  disabled={isLoading}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Check className="w-4 h-4" />
                  )}
                  Save Preferences
                </button>
                
                <button
                  onClick={handleAcceptAll}
                  disabled={isLoading}
                  className="flex-1 bg-gray-700/50 hover:bg-gray-600/50 border border-gray-600 text-gray-300 hover:text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Accept All
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
