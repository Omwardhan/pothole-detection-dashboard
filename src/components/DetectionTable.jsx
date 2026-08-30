import React, { useState, useMemo } from 'react';
import { History, Search, Filter, ChevronLeft, ChevronRight, CheckCircle2, FlaskConical, AlertCircle } from 'lucide-react';

export const DetectionTable = ({ detections = [], isLoading = false }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'verified' | 'test'
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 8;

  // Filter & Search logic
  const filteredDetections = useMemo(() => {
    return detections.filter((item) => {
      // Status filter
      if (statusFilter === 'verified' && item.test === true) return false;
      if (statusFilter === 'test' && item.test !== true) return false;

      // Search term filter (Camera ID, class, or confidence string)
      if (searchTerm.trim() !== '') {
        const term = searchTerm.toLowerCase();
        const matchesCamera = (item.camera_id || '').toLowerCase().includes(term);
        const matchesClass = (item.class || '').toLowerCase().includes(term);
        const matchesConfidence = ((item.confidence || 0) * 100).toFixed(1).includes(term);
        return matchesCamera || matchesClass || matchesConfidence;
      }

      return true;
    });
  }, [detections, searchTerm, statusFilter]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredDetections.length / rowsPerPage) || 1;
  const paginatedDetections = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredDetections.slice(start, start + rowsPerPage);
  }, [filteredDetections, currentPage, rowsPerPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-card overflow-hidden">
      {/* Table Header & Controls */}
      <div className="p-4 border-b border-slate-200 bg-slate-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-slate-700" />
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
            Detection History
          </h2>
          <span className="ml-2 px-2 py-0.5 text-xs font-mono font-semibold bg-slate-200 text-slate-700 rounded-full">
            {filteredDetections.length} logs
          </span>
        </div>

        {/* Filter and Search controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search camera or class..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-slate-400 text-slate-800 w-40 sm:w-48 placeholder-slate-400"
            />
          </div>

          {/* Status Dropdown */}
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="text-xs bg-white border border-slate-300 rounded px-2.5 py-1.5 text-slate-700 focus:outline-none focus:ring-1 focus:ring-slate-400"
          >
            <option value="all">All Records</option>
            <option value="verified">Verified (Live)</option>
            <option value="test">Test Flagged</option>
          </select>
        </div>
      </div>

      {/* Table Body */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-100/70 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
              <th className="py-3 px-4">Time</th>
              <th className="py-3 px-4">Confidence</th>
              <th className="py-3 px-4">Class</th>
              <th className="py-3 px-4">Camera</th>
              <th className="py-3 px-4 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-mono">
            {isLoading ? (
              <tr>
                <td colSpan="5" className="py-8 text-center text-slate-500 font-sans">
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></div>
                    <span>Loading detection records from Firestore...</span>
                  </div>
                </td>
              </tr>
            ) : paginatedDetections.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-12 text-center text-slate-400 font-sans">
                  <AlertCircle className="w-6 h-6 mx-auto mb-2 text-slate-300" />
                  <p className="font-semibold text-slate-600">No detections found</p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {searchTerm || statusFilter !== 'all'
                      ? 'Try adjusting your search query or filters.'
                      : 'New detections will automatically stream in from Firestore.'}
                  </p>
                </td>
              </tr>
            ) : (
              paginatedDetections.map((item) => {
                const confPct = ((item.confidence || 0) * 100).toFixed(1);
                const itemDate = new Date(item.timestamp);
                const timeString = itemDate.toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                  hour12: true
                });
                const dateString = itemDate.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric'
                });

                return (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-50/80 transition-colors"
                  >
                    {/* Time */}
                    <td className="py-3 px-4 text-slate-700">
                      <div className="font-semibold text-slate-900">{timeString}</div>
                      <div className="text-[10px] text-slate-400 font-sans">{dateString}</div>
                    </td>

                    {/* Confidence */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 w-12 tabular-nums">
                          {confPct}%
                        </span>
                        <div className="w-16 bg-slate-200 rounded-full h-1.5 hidden sm:block overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              item.confidence >= 0.8
                                ? 'bg-emerald-500'
                                : item.confidence >= 0.65
                                ? 'bg-amber-500'
                                : 'bg-orange-500'
                            }`}
                            style={{ width: `${Math.min(100, item.confidence * 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>

                    {/* Class */}
                    <td className="py-3 px-4 text-slate-800 capitalize font-medium">
                      <span className="px-2 py-0.5 bg-slate-100 rounded text-slate-700 border border-slate-200">
                        {item.class}
                      </span>
                    </td>

                    {/* Camera */}
                    <td className="py-3 px-4 text-slate-700 uppercase font-semibold">
                      {item.camera_id}
                    </td>

                    {/* Status */}
                    <td className="py-3 px-4 text-right">
                      {item.test ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 border border-slate-300">
                          <FlaskConical className="w-3 h-3 text-slate-500" />
                          TEST
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200 font-sans">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          Verified
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
        <span className="font-mono">
          Page <span className="font-bold text-slate-800">{currentPage}</span> of{' '}
          <span className="font-bold text-slate-800">{totalPages}</span>
        </span>

        <div className="flex items-center gap-1">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1 || isLoading}
            className="p-1 rounded border border-slate-300 bg-white text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages || isLoading}
            className="p-1 rounded border border-slate-300 bg-white text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
