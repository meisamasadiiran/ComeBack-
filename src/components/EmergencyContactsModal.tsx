import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Phone, MessageSquare, Copy, Check, Plus, Trash2, UserPlus, HeartHandshake } from 'lucide-react';

export const EmergencyContactsModal: React.FC = () => {
  const { activeModal, closeModal, contacts, updateContact, addCustomContact, deleteContact, t, addRP, openHelp } = useApp();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const [showAddCustom, setShowAddCustom] = useState(false);
  const [customName, setCustomName] = useState('');
  const [customPhone, setCustomPhone] = useState('');
  const [customLabel, setCustomLabel] = useState('');

  if (activeModal !== 'emergencyContacts') return null;

  const startEdit = (c: any) => {
    setEditingId(c.id);
    setEditName(c.name || '');
    setEditPhone(c.phone || '');
  };

  const saveEdit = (id: string) => {
    updateContact(id, editName.trim(), editPhone.trim());
    setEditingId(null);
  };

  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim() || !customPhone.trim()) return;
    addCustomContact(customName.trim(), customPhone.trim(), customLabel.trim() || 'دوست امن');
    setCustomName('');
    setCustomPhone('');
    setCustomLabel('');
    setShowAddCustom(false);
  };

  const copyTemplate = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  const handleContactCall = (type: string) => {
    if (type === 'sponsor') {
      addRP(3, 'تماس ضروری با راهنما', 'Emergency call to sponsor', 'sponsor');
    } else {
      addRP(3, 'تماس ضروری با آدم امن', 'Emergency call to safe person', 'safe_person');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#171717]/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md bg-[#F7F5F0] rounded-3xl p-6 shadow-2xl border border-[#E5E0D6] flex flex-col max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 mb-2 border-b border-[#E5E0D6]">
          <div className="flex items-center gap-2 text-[#E45A2A]">
            <Phone size={20} />
            <span className="font-bold text-base text-[#171717]">
              {t.contactsTitle}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => openHelp('contacts')}
              className="text-xs text-[#6B6760] hover:text-[#171717] px-2 py-0.5 rounded-full border border-[#D9D4CB]"
            >
              ⓘ
            </button>
            <button
              onClick={closeModal}
              className="p-1 rounded-full text-[#6B6760] hover:text-[#171717]"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        <p className="text-xs text-[#6B6760] mb-3">
          {t.contactsSubtitle}
        </p>

        {/* Ready SMS Templates (Quick Copy / Share) */}
        <div className="bg-[#FAF8F5] p-3.5 rounded-2xl border border-[#E5E0D6] mb-4 space-y-2">
          <span className="text-xs font-bold text-[#171717] flex items-center gap-1">
            <MessageSquare size={14} className="text-[#E45A2A]" />
            {t.readySmsTitle}
          </span>

          <div className="space-y-2">
            <div className="bg-white p-2.5 rounded-xl border border-[#ECE8DE] flex items-center justify-between gap-2">
              <p className="text-xs text-[#2A2A2A] leading-relaxed">
                {t.smsTemplate1}
              </p>
              <button
                type="button"
                onClick={() => copyTemplate(t.smsTemplate1, 1)}
                className="p-1.5 rounded-lg bg-[#F7F5F0] hover:bg-[#EFECE5] text-[#171717] flex-shrink-0"
                title={t.smsCopied}
              >
                {copiedIndex === 1 ? <Check size={14} className="text-[#3E6B57]" /> : <Copy size={14} />}
              </button>
            </div>

            <div className="bg-white p-2.5 rounded-xl border border-[#ECE8DE] flex items-center justify-between gap-2">
              <p className="text-xs text-[#2A2A2A] leading-relaxed">
                {t.smsTemplate2}
              </p>
              <button
                type="button"
                onClick={() => copyTemplate(t.smsTemplate2, 2)}
                className="p-1.5 rounded-lg bg-[#F7F5F0] hover:bg-[#EFECE5] text-[#171717] flex-shrink-0"
                title={t.smsCopied}
              >
                {copiedIndex === 2 ? <Check size={14} className="text-[#3E6B57]" /> : <Copy size={14} />}
              </button>
            </div>
          </div>
        </div>

        {/* Contact List */}
        <div className="space-y-3">
          {contacts.map((contact, index) => {
            const isEditing = editingId === contact.id;
            const labelText =
              contact.type === 'sponsor'
                ? t.contactSponsor
                : contact.type === 'spouse'
                ? t.contactSpouse
                : contact.type === 'family'
                ? t.contactFamily
                : contact.customLabel || 'آدم امن';

            return (
              <div
                key={contact.id}
                className="bg-white p-3.5 rounded-2xl border border-[#E5E0D6] shadow-subtle space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#E45A2A]">
                    {labelText}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {!isEditing ? (
                      <button
                        onClick={() => startEdit(contact)}
                        className="text-[11px] text-[#6B6760] hover:text-[#171717] underline"
                      >
                        {contact.phone ? 'ویرایش' : 'ثبت شماره'}
                      </button>
                    ) : (
                      <button
                        onClick={() => saveEdit(contact.id)}
                        className="text-[11px] font-bold text-[#3E6B57] bg-[#EFF6F2] px-2 py-0.5 rounded-lg"
                      >
                        ذخیره
                      </button>
                    )}
                    {contact.type === 'custom' && (
                      <button
                        onClick={() => deleteContact(contact.id)}
                        className="text-[#B83A32] p-1"
                      >
                        <Trash2 size={13} />
                      </button>
                    )}
                  </div>
                </div>

                {isEditing ? (
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      placeholder={t.contactNamePlaceholder}
                      className="p-2 bg-[#F7F5F0] rounded-xl border border-[#E5E0D6] text-xs"
                    />
                    <input
                      type="tel"
                      value={editPhone}
                      onChange={(e) => setEditPhone(e.target.value)}
                      placeholder={t.contactPhonePlaceholder}
                      className="p-2 bg-[#F7F5F0] rounded-xl border border-[#E5E0D6] text-xs"
                      dir="ltr"
                    />
                  </div>
                ) : (
                  <div className="flex items-center justify-between pt-1">
                    <div>
                      <p className="text-sm font-bold text-[#171717]">
                        {contact.name || (contact.phone ? 'ثبت شده' : 'هنوز ثبت نشده')}
                      </p>
                      <p className="text-xs text-[#6B6760] font-mono" dir="ltr">
                        {contact.phone || 'بدون شماره'}
                      </p>
                    </div>

                    {contact.phone ? (
                      <div className="flex gap-2">
                        <a
                          href={`sms:${contact.phone}?body=${encodeURIComponent(t.smsTemplate1)}`}
                          className="p-2 rounded-xl bg-[#FAF5EB] text-[#C98A28] border border-[#F2E5D0] hover:bg-[#F3EAD9]"
                          title={t.contactSendSms}
                        >
                          <MessageSquare size={16} />
                        </a>
                        <a
                          href={`tel:${contact.phone}`}
                          onClick={() => handleContactCall(contact.type)}
                          className="px-3 py-2 rounded-xl bg-[#E45A2A] text-white font-bold text-xs flex items-center gap-1.5 shadow-sm hover:bg-[#D44B1C]"
                        >
                          <Phone size={14} />
                          <span>تماس</span>
                        </a>
                      </div>
                    ) : (
                      <button
                        onClick={() => startEdit(contact)}
                        className="text-xs text-[#E45A2A] font-semibold"
                      >
                        + افزودن شماره
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Add custom contact button / form */}
        {!showAddCustom ? (
          <button
            onClick={() => setShowAddCustom(true)}
            className="w-full mt-3 py-3 border border-dashed border-[#D9D4CB] rounded-2xl text-xs font-bold text-[#6B6760] hover:text-[#171717] hover:border-[#171717] transition flex items-center justify-center gap-1.5 bg-white"
          >
            <Plus size={16} />
            <span>{t.contactAddCustom}</span>
          </button>
        ) : (
          <form onSubmit={handleAddCustom} className="mt-3 bg-white p-3.5 rounded-2xl border border-[#E5E0D6] space-y-2.5">
            <span className="text-xs font-bold text-[#171717] block">
              افزودن فرد امن جدید:
            </span>
            <input
              type="text"
              required
              value={customLabel}
              onChange={(e) => setCustomLabel(e.target.value)}
              placeholder="نسبت (مثلاً دوست صمیمی، راهنمای موقت...)"
              className="w-full p-2 bg-[#F7F5F0] rounded-xl border border-[#E5E0D6] text-xs"
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                required
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                placeholder={t.contactNamePlaceholder}
                className="p-2 bg-[#F7F5F0] rounded-xl border border-[#E5E0D6] text-xs"
              />
              <input
                type="tel"
                required
                value={customPhone}
                onChange={(e) => setCustomPhone(e.target.value)}
                placeholder={t.contactPhonePlaceholder}
                className="p-2 bg-[#F7F5F0] rounded-xl border border-[#E5E0D6] text-xs"
                dir="ltr"
              />
            </div>
            <div className="flex gap-2 pt-1">
              <button
                type="submit"
                className="flex-1 py-2 bg-[#171717] text-white rounded-xl text-xs font-bold hover:bg-[#2A2A2A]"
              >
                ذخیره مخاطب
              </button>
              <button
                type="button"
                onClick={() => setShowAddCustom(false)}
                className="px-3 py-2 bg-[#F7F5F0] text-[#6B6760] rounded-xl text-xs hover:text-[#171717]"
              >
                انصراف
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
