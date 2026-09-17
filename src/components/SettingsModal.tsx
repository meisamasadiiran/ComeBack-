import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Shield, Download, Upload, Trash2, Bell, Cpu, Check, AlertTriangle } from 'lucide-react';

export const SettingsModal: React.FC = () => {
  const { activeModal, closeModal, settings, updateSettings, exportData, importData, clearAllData, t } = useApp();

  const [importStatus, setImportStatus] = useState<string | null>(null);

  if (activeModal !== 'settings') return null;

  const handleExport = () => {
    const dataStr = exportData();
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `comeback-backup-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const success = importData(content);
      if (success) {
        setImportStatus('پشتیبان با موفقیت بازیابی شد.');
        setTimeout(() => setImportStatus(null), 3000);
      } else {
        setImportStatus('خطا در فایل پشتیبان.');
      }
    };
    reader.readAsText(file);
  };

  const handleClear = () => {
    if (window.confirm(t.clearConfirm)) {
      clearAllData();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#171717]/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md bg-[#F7F5F0] rounded-3xl p-6 shadow-2xl border border-[#E5E0D6] flex flex-col max-h-[92vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 mb-2 border-b border-[#E5E0D6]">
          <div className="flex items-center gap-2 text-[#171717]">
            <Shield size={20} className="text-[#3E6B57]" />
            <span className="font-bold text-base text-[#171717]">
              {t.settingsTitle}
            </span>
          </div>
          <button
            onClick={closeModal}
            className="p-1 rounded-full text-[#6B6760] hover:text-[#171717]"
          >
            <X size={18} />
          </button>
        </div>

        <p className="text-xs text-[#6B6760] mb-4">
          {t.settingsSubtitle}
        </p>

        <div className="space-y-4">
          {/* Toggles */}
          <div className="bg-white p-4 rounded-2xl border border-[#E5E0D6] shadow-subtle space-y-3">
            <label className="flex items-center justify-between cursor-pointer">
              <div className="flex items-center gap-2">
                <Bell size={16} className="text-[#C98A28]" />
                <span className="text-xs font-bold text-[#171717]">
                  {t.settingsNotifications}
                </span>
              </div>
              <input
                type="checkbox"
                checked={settings.notificationsEnabled}
                onChange={(e) => updateSettings({ notificationsEnabled: e.target.checked })}
                className="w-4 h-4 rounded text-[#E45A2A] focus:ring-[#E45A2A]"
              />
            </label>

            <div className="border-t border-[#F0ECE1] pt-3">
              <label className="flex items-center justify-between cursor-pointer">
                <div className="flex items-center gap-2">
                  <Cpu size={16} className="text-[#E45A2A]" />
                  <span className="text-xs font-bold text-[#171717]">
                    {t.settingsAiAccess}
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={settings.aiAssistanceEnabled}
                  onChange={(e) => updateSettings({ aiAssistanceEnabled: e.target.checked })}
                  className="w-4 h-4 rounded text-[#E45A2A] focus:ring-[#E45A2A]"
                />
              </label>
            </div>
          </div>

          {/* Backup & Restore */}
          <div className="bg-white p-4 rounded-2xl border border-[#E5E0D6] shadow-subtle space-y-3">
            <span className="text-xs font-bold text-[#171717] block">
              پشتیبان‌گیری محلی:
            </span>

            {importStatus && (
              <div className="p-2 bg-[#EFF6F2] text-[#3E6B57] rounded-xl text-xs flex items-center gap-1">
                <Check size={14} />
                <span>{importStatus}</span>
              </div>
            )}

            <button
              onClick={handleExport}
              className="w-full py-2.5 bg-[#F7F5F0] hover:bg-[#EFECE5] rounded-xl text-xs font-bold text-[#171717] border border-[#E5E0D6] flex items-center justify-center gap-2 transition"
            >
              <Download size={14} />
              <span>{t.exportBackupBtn}</span>
            </button>

            <label className="w-full py-2.5 bg-[#F7F5F0] hover:bg-[#EFECE5] rounded-xl text-xs font-bold text-[#171717] border border-[#E5E0D6] flex items-center justify-center gap-2 transition cursor-pointer">
              <Upload size={14} />
              <span>{t.importBackupBtn}</span>
              <input
                type="file"
                accept=".json"
                onChange={handleImportFile}
                className="hidden"
              />
            </label>
          </div>

          {/* Wipe data danger zone */}
          <div className="bg-[#FDF2F1] p-4 rounded-2xl border border-[#F6DCD2] space-y-2">
            <div className="flex items-center gap-1.5 text-[#B83A32]">
              <AlertTriangle size={15} />
              <span className="text-xs font-bold">منطقه خطر</span>
            </div>
            <p className="text-[11px] text-[#6B6760] leading-relaxed">
              با این دکمه تمام سوابق و روزهای ثبت‌شده از این مرورگر برای همیشه پاک می‌شوند.
            </p>
            <button
              onClick={handleClear}
              className="w-full py-2 bg-white text-[#B83A32] border border-[#B83A32] rounded-xl text-xs font-bold hover:bg-[#FDF2F1] transition flex items-center justify-center gap-1.5"
            >
              <Trash2 size={13} />
              <span>{t.clearDataBtn}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
