import { ITV_COURSES } from '../data/itvedantData';

export function directDownloadCurriculumPdf(courseTitle?: string) {
  const course =
    ITV_COURSES.find(
      (c) =>
        c.title.toLowerCase() === (courseTitle || '').toLowerCase() ||
        c.shortTitle.toLowerCase() === (courseTitle || '').toLowerCase() ||
        c.id === courseTitle
    ) || ITV_COURSES[0];

  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${course.title} - Official 2026 Curriculum & Placement Roadmap</title>
  <style>
    @page { size: A4; margin: 18mm; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      color: #1E428E;
      background: #FFFFFF;
      line-height: 1.5;
      margin: 0;
      padding: 24px;
    }
    .header {
      border-bottom: 3px solid #3869C3;
      padding-bottom: 16px;
      margin-bottom: 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .brand-title {
      font-size: 26px;
      font-weight: 800;
      color: #1E428E;
      letter-spacing: -0.5px;
    }
    .brand-sub {
      font-size: 12px;
      color: #3869C3;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .badge {
      background: #D3E5FD;
      color: #1E428E;
      padding: 6px 14px;
      border-radius: 20px;
      font-size: 11px;
      font-weight: 700;
      border: 1px solid #3869C3;
    }
    .course-title {
      font-size: 28px;
      font-weight: 800;
      color: #1E428E;
      margin: 0 0 8px 0;
      line-height: 1.2;
    }
    .meta-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 12px;
      background: #F4F8FE;
      padding: 14px;
      border-radius: 12px;
      border: 1px solid #D3E5FD;
      margin: 16px 0 24px 0;
    }
    .meta-item {
      font-size: 12px;
    }
    .meta-label {
      color: #5A87D7;
      font-weight: 600;
      text-transform: uppercase;
      font-size: 10px;
      display: block;
    }
    .meta-val {
      font-weight: 800;
      color: #1E428E;
      font-size: 14px;
    }
    .section-title {
      font-size: 16px;
      font-weight: 800;
      color: #1E428E;
      border-bottom: 1.5px solid #D3E5FD;
      padding-bottom: 6px;
      margin: 20px 0 12px 0;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .module-card {
      border: 1px solid #E2EDFC;
      border-radius: 10px;
      padding: 12px 16px;
      margin-bottom: 10px;
      background: #FAFCFF;
    }
    .module-head {
      display: flex;
      justify-content: space-between;
      font-weight: 700;
      color: #1E428E;
      font-size: 13px;
    }
    .module-topics {
      font-size: 11px;
      color: #3869C3;
      margin: 4px 0;
    }
    .tools-list {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin: 10px 0;
    }
    .tool-chip {
      background: #FFFFFF;
      border: 1px solid #D3E5FD;
      padding: 4px 10px;
      border-radius: 6px;
      font-size: 11px;
      font-weight: 700;
      color: #1E428E;
    }
    .footer {
      margin-top: 36px;
      border-top: 2px solid #E2EDFC;
      padding-top: 14px;
      font-size: 11px;
      color: #5A87D7;
      display: flex;
      justify-content: space-between;
    }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <div class="brand-title">HRIDAYAM <span style="color:#5A87D7">BY BELVO</span></div>
      <div class="brand-sub">Next-Gen Industry Academy • Official Syllabus</div>
    </div>
    <div class="badge">Verified 2026 Cohort</div>
  </div>

  <h1 class="course-title">${course.title}</h1>
  <p style="font-size: 13px; color: #1E428E; margin: 0 0 16px 0;">${course.summary}</p>

  <div class="meta-grid">
    <div class="meta-item">
      <span class="meta-label">Duration</span>
      <span class="meta-val">${course.duration}</span>
    </div>
    <div class="meta-item">
      <span class="meta-label">Mode</span>
      <span class="meta-val">${course.mode}</span>
    </div>
    <div class="meta-item">
      <span class="meta-label">Highest Package</span>
      <span class="meta-val">${course.highestPackage}</span>
    </div>
    <div class="meta-item">
      <span class="meta-label">Average Package</span>
      <span class="meta-val">${course.avgPackage}</span>
    </div>
  </div>

  <div class="section-title">Industry Standard Tools Covered</div>
  <div class="tools-list">
    ${course.toolsCovered.map((t) => `<span class="tool-chip">${t}</span>`).join('')}
  </div>

  <div class="section-title">Week-by-Week Modular Curriculum</div>
  ${course.curriculum
    .map(
      (m) => `
    <div class="module-card">
      <div class="module-head">
        <span>Module ${m.moduleNumber}: ${m.title}</span>
        <span style="color: #5A87D7;">${m.duration}</span>
      </div>
      <div class="module-topics"><strong>Topics:</strong> ${m.topics.join(' • ')}</div>
      <div style="font-size: 11px; color: #1E428E;"><strong>Skills Acquired:</strong> ${m.skillsGained}</div>
    </div>
  `
    )
    .join('')}

  <div class="section-title">Verified Capstone Industry Projects</div>
  ${course.capstoneProjects
    .map(
      (c) => `
    <div class="module-card" style="border-left: 3px solid #3869C3;">
      <div style="font-weight: 700; font-size: 13px; color: #1E428E;">${c.title}</div>
      <p style="font-size: 11px; margin: 4px 0; color: #1E428E;">${c.description}</p>
      <div style="font-size: 10px; color: #3869C3;"><strong>Production Stack:</strong> ${c.tools.join(', ')}</div>
    </div>
  `
    )
    .join('')}

  <div class="section-title">Career Roles & Hiring Partners</div>
  <div style="font-size: 12px; margin-bottom: 8px;">
    <strong>Target Job Roles:</strong> ${course.careerRoles.join(' • ')}
  </div>
  <div style="font-size: 12px; color: #1E428E;">
    <strong>Certification:</strong> ${course.certification}
  </div>

  <div class="footer">
    <span>Hridayam by Belvo Academic Desk • Call / WhatsApp: +91 89284 66820</span>
    <span>Centers: Mumbai • Thane • Pune • Nagpur • Live Online</span>
  </div>

  <script>
    window.onload = function() {
      // Auto open print dialog for PDF saving
      window.print();
    };
  </script>
</body>
</html>`;

  // Create Blob & trigger immediate direct download
  const blob = new Blob([htmlContent], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  const fileName = `${course.title.replace(/[^a-zA-Z0-9]/g, '_')}_Official_Syllabus_2026.html`;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  // Also open in a clean preview tab so the user can instantly print or save as PDF
  const printWindow = window.open(url, '_blank');
  if (printWindow) {
    printWindow.focus();
  }
}
