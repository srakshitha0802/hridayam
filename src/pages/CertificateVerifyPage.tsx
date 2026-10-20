import React, { useState, useEffect } from 'react';
import { storageService } from '../services/storage';
import { Certificate } from '../types';
import { ShieldCheck, Search, Award, CheckCircle2, AlertTriangle, ExternalLink, Calendar, User } from 'lucide-react';

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
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-teal-800 bg-teal-50 border border-teal-200/60 px-3 py-1 rounded-md">
          <ShieldCheck className="w-4 h-4 text-teal-600" />
          <span>Official Public Registry</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
          Certificate Authenticity Verification
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
          Validate credentials issued by Hridayam by Belvo. Enter the unique Certificate Record ID to confirm student completion against our server registry.
        </p>
      </div>

      {/* Verification Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs max-w-2xl mx-auto">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={certIdQuery}
              onChange={(e) => setCertIdQuery(e.target.value)}
              placeholder="e.g. HRD-2026-4891"
              required
              className="w-full pl-10 pr-4 py-2.5 text-xs font-mono bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-teal-500 uppercase"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2.5 text-xs font-bold text-white bg-slate-950 hover:bg-slate-800 rounded-xl transition-colors cursor-pointer shrink-0"
          >
            Verify Credential
          </button>
        </form>
        <p className="text-[11px] text-slate-400 mt-2 text-center">
          Try verified sample ID: <button type="button" onClick={() => { setCertIdQuery('HRD-2026-4891'); setSearchedId('HRD-2026-4891'); setCertificate(storageService.getCertificateById('HRD-2026-4891')); }} className="text-teal-700 underline font-mono">HRD-2026-4891</button>
        </p>
      </div>

      {/* Verification Result Card */}
      {searchedId && (
        <div className="max-w-2xl mx-auto">
          {certificate ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-md space-y-6">
              {/* Authenticated Banner */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Valid Credential Record</h3>
                    <p className="text-[11px] text-slate-500">Record officially authenticated by Belvo Registry</p>
                  </div>
                </div>

                <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-md ${certificate.status === 'valid' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'}`}>
                  {certificate.status === 'valid' ? 'ACTIVE & VERIFIED' : 'REVOKED'}
                </span>
              </div>

              {/* Credential Data Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Recipient Name</p>
                  <p className="text-base font-bold text-slate-900 mt-0.5 flex items-center gap-1.5">
                    <User className="w-4 h-4 text-slate-400" />
                    <span>{certificate.userName}</span>
                  </p>
                </div>

                <div>
                  <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Date Issued</p>
                  <p className="text-sm font-semibold text-slate-800 mt-0.5 flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span>{certificate.issueDate}</span>
                  </p>
                </div>

                <div className="sm:col-span-2">
                  <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Course & Curriculum</p>
                  <p className="text-sm font-bold text-teal-900 mt-0.5">{certificate.courseTitle}</p>
                  <p className="text-xs text-slate-500 mt-0.5">Discipline: {certificate.categoryName}</p>
                </div>

                <div>
                  <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Faculty Director</p>
                  <p className="text-xs font-semibold text-slate-800 mt-0.5">{certificate.instructorName}</p>
                </div>

                <div>
                  <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Cryptographic Auth Key</p>
                  <p className="text-xs font-mono text-slate-600 mt-0.5 truncate">{certificate.verificationCode}</p>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl text-[11px] text-slate-500 border border-slate-100 flex items-center justify-between">
                <span>Issuing Body: Hridayam by Belvo Digital Academy</span>
                <span className="font-mono">ID: {certificate.id}</span>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-rose-200 p-8 text-center space-y-3">
              <AlertTriangle className="w-10 h-10 text-rose-500 mx-auto" />
              <h3 className="text-base font-bold text-slate-900">Certificate Not Found</h3>
              <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                No record matching ID <strong className="font-mono text-slate-900">{searchedId}</strong> exists in the Belvo Registry. Please verify the ID on your printed or digital credential.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
