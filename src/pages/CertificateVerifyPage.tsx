import React, { useState } from 'react';
import { storageService } from '../services/storage';
import { Certificate } from '../types';
import { ShieldCheck, Search, CheckCircle2, AlertTriangle, Calendar, User } from 'lucide-react';

export const CertificateVerifyPage: React.FC<{ initialCertId?: string }> = ({ initialCertId }) => {
  const [certIdQuery, setCertIdQuery] = useState(initialCertId || 'HRD-2026-4891');
  const [searchedId, setSearchedId] = useState(initialCertId || 'HRD-2026-4891');
  const [certificate, setCertificate] = useState<Certificate | undefined>(() => {
    return storageService.getCertificateById(initialCertId || 'HRD-2026-4891');
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!certIdQuery.trim()) return;
    const cleanId = certIdQuery.trim().toUpperCase();
    setSearchedId(cleanId);
    const found = storageService.getCertificateById(cleanId);
    setCertificate(found);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 space-y-10">
      {/* Page Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#760D3B] bg-[#FCE7F3] border border-[#F0D6E3] px-3.5 py-1 rounded-full shadow-2xs">
          <ShieldCheck className="w-4 h-4 text-[#C2185B]" />
          <span>Official Public Registry</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#21131B] tracking-tight">
          Certificate Authenticity Verification
        </h1>
        <p className="text-xs sm:text-sm text-[#756572] max-w-xl mx-auto leading-relaxed">
          Validate credentials issued by Hridayam by Belvo. Enter the unique Certificate Record ID to confirm student completion against our server registry.
        </p>
      </div>

      {/* Verification Search Bar */}
      <div className="bg-white rounded-3xl border border-[#F0D6E3] p-6 shadow-xs max-w-2xl mx-auto">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#756572] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={certIdQuery}
              onChange={(e) => setCertIdQuery(e.target.value)}
              placeholder="e.g. HRD-2026-4891"
              required
              className="w-full pl-10 pr-4 py-2.5 text-xs font-mono bg-[#FFFBFD] border border-[#F0D6E3] rounded-xl text-[#21131B] placeholder-[#756572]/60 focus:bg-white focus:outline-none focus:border-[#C2185B] focus:ring-2 focus:ring-[#FCE7F3] uppercase transition-colors"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-[#C2185B] hover:bg-[#760D3B] rounded-xl transition-all cursor-pointer shrink-0 shadow-md hover:shadow-lg"
          >
            Verify Credential
          </button>
        </form>
        <p className="text-[11px] text-[#756572] mt-2 text-center">
          Try verified sample ID:{' '}
          <button
            type="button"
            onClick={() => {
              setCertIdQuery('HRD-2026-4891');
              setSearchedId('HRD-2026-4891');
              setCertificate(storageService.getCertificateById('HRD-2026-4891'));
            }}
            className="text-[#C2185B] hover:text-[#760D3B] underline font-mono font-bold cursor-pointer"
          >
            HRD-2026-4891
          </button>
        </p>
      </div>

      {/* Verification Result Card */}
      {searchedId && (
        <div className="max-w-2xl mx-auto">
          {certificate ? (
            <div className="bg-white rounded-3xl border border-[#F0D6E3] p-8 shadow-md space-y-6">
              {/* Authenticated Banner */}
              <div className="flex items-center justify-between border-b border-[#F0D6E3]/60 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-[#FCE7F3] border border-[#F0D6E3] flex items-center justify-center text-[#C2185B]">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#21131B]">Valid Credential Record</h3>
                    <p className="text-[11px] text-[#756572]">Record officially authenticated by Belvo Registry</p>
                  </div>
                </div>

                <span
                  className={`text-xs font-mono font-bold px-2.5 py-1 rounded-md ${
                    certificate.status === 'valid'
                      ? 'bg-[#FCE7F3] text-[#760D3B] border border-[#F0D6E3]'
                      : 'bg-rose-50 text-rose-700 border border-rose-200'
                  }`}
                >
                  {certificate.status === 'valid' ? 'ACTIVE & VERIFIED' : 'REVOKED'}
                </span>
              </div>

              {/* Credential Data Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-wider text-[#756572]">Recipient Name</p>
                  <p className="text-base font-bold text-[#21131B] mt-0.5 flex items-center gap-1.5">
                    <User className="w-4 h-4 text-[#C2185B]" />
                    <span>{certificate.userName}</span>
                  </p>
                </div>

                <div>
                  <p className="text-[10px] font-mono uppercase tracking-wider text-[#756572]">Date Issued</p>
                  <p className="text-sm font-semibold text-[#21131B] mt-0.5 flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-[#C2185B]" />
                    <span>{certificate.issueDate}</span>
                  </p>
                </div>

                <div className="sm:col-span-2">
                  <p className="text-[10px] font-mono uppercase tracking-wider text-[#756572]">Course & Curriculum</p>
                  <p className="text-sm font-bold text-[#760D3B] mt-0.5">{certificate.courseTitle}</p>
                  <p className="text-xs text-[#756572] mt-0.5">Discipline: {certificate.categoryName}</p>
                </div>

                <div>
                  <p className="text-[10px] font-mono uppercase tracking-wider text-[#756572]">Faculty Director</p>
                  <p className="text-xs font-semibold text-[#21131B] mt-0.5">{certificate.instructorName}</p>
                </div>

                <div>
                  <p className="text-[10px] font-mono uppercase tracking-wider text-[#756572]">Cryptographic Auth Key</p>
                  <p className="text-xs font-mono text-[#756572] mt-0.5 truncate">{certificate.verificationCode}</p>
                </div>
              </div>

              <div className="p-3 bg-[#FFF5F9] rounded-xl text-[11px] text-[#756572] border border-[#F0D6E3] flex items-center justify-between">
                <span>Issuing Body: Hridayam by Belvo Digital Academy</span>
                <span className="font-mono font-bold text-[#760D3B]">ID: {certificate.id}</span>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-rose-200 p-8 text-center space-y-3">
              <AlertTriangle className="w-10 h-10 text-rose-500 mx-auto" />
              <h3 className="text-base font-bold text-[#21131B]">Certificate Not Found</h3>
              <p className="text-xs text-[#756572] max-w-md mx-auto leading-relaxed">
                No record matching ID <strong className="font-mono text-[#21131B]">{searchedId}</strong> exists in the Belvo Registry. Please verify the ID on your printed or digital credential.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
