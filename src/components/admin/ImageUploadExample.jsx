'use client';

import { useState } from 'react';
import ImageUploadComponent from './ImageUploadComponent';

// Example: How to use ImageUploadComponent in different admin panels
export default function ImageUploadExample() {
  const [teamPhoto, setTeamPhoto] = useState('');
  const [caseStudyImage, setCaseStudyImage] = useState('');
  const [solutionIcon, setSolutionIcon] = useState('');

  return (
    <div className="space-y-8 p-6">
      <h2 className="text-2xl font-bold text-slate-900">Image Upload Examples</h2>
      
      {/* Team Management Example */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Team Management</h3>
        <ImageUploadComponent
          value={teamPhoto}
          onChange={setTeamPhoto}
          placeholder="Team member photo"
          title="Select Team Photo"
          showRecent={true}
        />
      </div>

      {/* Case Studies Example */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Case Studies</h3>
        <ImageUploadComponent
          value={caseStudyImage}
          onChange={setCaseStudyImage}
          placeholder="Case study cover image"
          title="Select Cover Image"
          showRecent={true}
        />
      </div>

      {/* Solutions Example */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Solutions</h3>
        <ImageUploadComponent
          value={solutionIcon}
          onChange={setSolutionIcon}
          placeholder="Solution icon"
          title="Select Solution Icon"
          showRecent={false}
        />
      </div>
    </div>
  );
}
