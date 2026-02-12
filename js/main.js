// Import data
import { jobs, programStudi, companies, mitraPolhas, supported, skillRoadmaps } from './data.js';

// Debug log
console.log('=== POLHAS CAREERBRIDGE LOADED ===');
console.log('Total Jobs:', jobs.length);
console.log('Total Roadmaps:', Object.keys(skillRoadmaps).length);

// DOM Elements
const jobContainer = document.getElementById('job-container');
const prodiContainer = document.getElementById('prodi-container');
const mitraHasnurContainer = document.getElementById('mitra-hasnur-container');
const mitraPolhasContainer = document.getElementById('mitra-polhas-container');
const supportedContainer = document.getElementById('supported-container');
const searchInput = document.getElementById('search-input');
const typeFilter = document.getElementById('type-filter');
const prodiFilter = document.getElementById('prodi-filter');
const modal = document.getElementById('job-modal');
const closeModalBtn = document.getElementById('close-modal');
const applyBtn = document.getElementById('apply-btn');
const saveJobBtn = document.getElementById('save-job-btn');
const jobCountEl = document.getElementById('job-count');

// State
let currentJobs = [...jobs];
let selectedJob = null;
let savedJobs = JSON.parse(localStorage.getItem('savedJobs')) || [];
let completedSkills = JSON.parse(localStorage.getItem('completedSkills')) || {};

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    animateStats();
    renderProdi();
    renderMitraHasnur();
    renderMitraPolhas();
    renderSupported();
    populateProdiFilter();
    renderJobs(currentJobs);
    initSkillRoadmap();
    initPortfolioScorecard();
    attachEventListeners();
});

// Animate Stats Counter
function animateStats() {
    const stats = [
        { id: 'stat-jobs', target: jobs.length },
        { id: 'stat-companies', target: companies.length },
        { id: 'stat-prodi', target: programStudi.length }
    ];

    stats.forEach(stat => {
        const el = document.getElementById(stat.id);
        let current = 0;
        const increment = stat.target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= stat.target) {
                el.textContent = stat.target;
                clearInterval(timer);
            } else {
                el.textContent = Math.floor(current);
            }
        }, 30);
    });
}

// Render Program Studi
function renderProdi() {
    prodiContainer.innerHTML = programStudi.map((prodi, index) => `
        <div class="bg-white border border-gray-200 rounded-xl p-6 hover:border-blue-600 hover:shadow-lg transition cursor-pointer" style="animation: fadeInUp 0.6s ease-out ${index * 0.1}s both">
            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <span class="text-2xl">${prodi.jenjang === 'D3' ? '🎓' : '🎯'}</span>
            </div>
            <h3 class="font-bold text-gray-900 mb-2">${prodi.shortName}</h3>
            <p class="text-sm text-gray-600">${prodi.jenjang}</p>
        </div>
    `).join('');
}

// Populate Prodi Filter
function populateProdiFilter() {
    prodiFilter.innerHTML = '<option value="">Semua Prodi</option>' + 
        programStudi.map(prodi => `<option value="${prodi.name}">${prodi.shortName}</option>`).join('');
}

// Render Mitra Hasnur
function renderMitraHasnur() {
    // Filter companies yang punya logo di mitra-hasnur
    const mitraHasnur = companies.filter(c => c.logo.includes('mitra-hasnur'));
    
    mitraHasnurContainer.innerHTML = mitraHasnur.map((company, index) => `
        <div class="bg-white border border-gray-200 rounded-xl p-6 hover:border-blue-600 hover:shadow-lg transition" style="animation: fadeInUp 0.6s ease-out ${index * 0.1}s both">
            <div class="h-24 flex items-center justify-center mb-4">
                <img src="${company.logo}" alt="${company.name}" class="max-h-full max-w-full object-contain">
            </div>
            <h4 class="text-sm font-semibold text-gray-900 text-center">${company.name}</h4>
        </div>
    `).join('');
}

// Render Mitra Polhas
function renderMitraPolhas() {
    if (mitraPolhas.length === 0) {
        mitraPolhasContainer.innerHTML = `
            <div class="col-span-full text-center py-12">
                <p class="text-gray-500">Segera hadir...</p>
            </div>
        `;
        return;
    }
    
    mitraPolhasContainer.innerHTML = mitraPolhas.map((mitra, index) => `
        <div class="bg-white border border-gray-200 rounded-xl p-6 hover:border-blue-600 hover:shadow-lg transition" style="animation: fadeInUp 0.6s ease-out ${index * 0.1}s both">
            <div class="h-24 flex items-center justify-center mb-4">
                <img src="${mitra.logo}" alt="${mitra.name}" class="max-h-full max-w-full object-contain">
            </div>
            <h4 class="text-sm font-semibold text-gray-900 text-center">${mitra.name}</h4>
        </div>
    `).join('');
}

// Render Supported
function renderSupported() {
    supportedContainer.innerHTML = supported.map((item, index) => `
        <div class="bg-white border border-gray-200 rounded-xl p-6 hover:border-blue-600 hover:shadow-lg transition" style="animation: fadeInUp 0.6s ease-out ${index * 0.1}s both">
            <div class="h-20 flex items-center justify-center mb-3">
                <img src="${item.logo}" alt="${item.name}" class="max-h-full max-w-full object-contain">
            </div>
            <h4 class="text-xs font-medium text-gray-700 text-center">${item.name}</h4>
        </div>
    `).join('');
}

// Render Jobs Function
function renderJobs(data) {
    jobCountEl.textContent = `Menampilkan ${data.length} lowongan`;

    if (data.length === 0) {
        jobContainer.innerHTML = `
            <div class="col-span-full text-center py-20">
                <svg class="w-24 h-24 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <h3 class="text-xl font-bold text-gray-900 mb-2">Tidak Ada Lowongan Ditemukan</h3>
                <p class="text-gray-600">Coba ubah kata kunci pencarian atau filter Anda</p>
            </div>
        `;
        return;
    }

    jobContainer.innerHTML = data.map((job, index) => {
        const isSaved = savedJobs.includes(job.id);
        const prodiText = Array.isArray(job.prodi) ? job.prodi[0] : job.prodi;
        
        return `
            <div class="bg-white border border-gray-200 rounded-xl p-6 hover:border-blue-600 hover:shadow-lg transition cursor-pointer job-card" 
                 style="animation: fadeInUp 0.6s ease-out ${index * 0.1}s both"
                 data-job-id="${job.id}">
                
                <!-- Card Header -->
                <div class="flex items-start justify-between mb-4">
                    <img src="${job.logo}" alt="${job.company}" class="w-12 h-12 object-contain">
                    <button class="save-btn p-2 hover:bg-gray-100 rounded-lg transition ${isSaved ? 'text-blue-600' : 'text-gray-400'}" data-job-id="${job.id}">
                        <svg class="w-5 h-5" fill="${isSaved ? 'currentColor' : 'none'}" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>
                        </svg>
                    </button>
                </div>
                
                <!-- Job Title -->
                <h3 class="text-xl font-bold text-gray-900 mb-2">${job.role}</h3>
                <p class="text-gray-600 text-sm mb-4">${job.company}</p>
                
                <!-- Job Meta -->
                <div class="flex flex-wrap gap-2 mb-4">
                    <span class="px-3 py-1 bg-blue-100 text-blue-600 rounded-lg text-xs font-semibold">
                        ${job.type}
                    </span>
                    <span class="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium">
                        📍 ${job.location}
                    </span>
                </div>
                
                <!-- Prodi Badge -->
                <div class="mb-4">
                    <span class="text-xs text-gray-600">
                        ${prodiText}
                    </span>
                </div>
                
                <!-- Action Button -->
                <button class="view-detail-btn w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition">
                    Lihat Detail
                </button>
            </div>
        `;
    }).join('');

    // Attach click handlers
    document.querySelectorAll('.job-card').forEach(card => {
        const viewBtn = card.querySelector('.view-detail-btn');
        viewBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const jobId = parseInt(card.dataset.jobId);
            openModal(jobId);
        });
    });

    // Attach save button handlers
    document.querySelectorAll('.save-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const jobId = parseInt(btn.dataset.jobId);
            toggleSaveJob(jobId);
        });
    });
}

// Filter Jobs Function
function filterJobs() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const typeValue = typeFilter.value;
    const prodiValue = prodiFilter.value;

    currentJobs = jobs.filter(job => {
        const matchesSearch = 
            job.role.toLowerCase().includes(searchTerm) ||
            job.company.toLowerCase().includes(searchTerm) ||
            job.description.toLowerCase().includes(searchTerm);
        
        const matchesType = !typeValue || job.type === typeValue;
        
        const matchesProdi = !prodiValue || (Array.isArray(job.prodi) 
            ? job.prodi.includes(prodiValue)
            : job.prodi === prodiValue);

        return matchesSearch && matchesType && matchesProdi;
    });

    renderJobs(currentJobs);
}

// Toggle Save Job
function toggleSaveJob(jobId) {
    const index = savedJobs.indexOf(jobId);
    const job = jobs.find(j => j.id === jobId);
    
    if (index > -1) {
        savedJobs.splice(index, 1);
        showToast('Lowongan dihapus dari simpanan', 'error');
    } else {
        savedJobs.push(jobId);
        showToast(`${job.role} disimpan!`, 'success');
    }
    
    localStorage.setItem('savedJobs', JSON.stringify(savedJobs));
    renderJobs(currentJobs);
}

// Open Modal Function
function openModal(jobId) {
    selectedJob = jobs.find(job => job.id === jobId);
    
    if (!selectedJob) return;

    // Populate modal content
    document.getElementById('modal-logo').src = selectedJob.logo;
    document.getElementById('modal-logo').alt = selectedJob.company;
    document.getElementById('modal-role').textContent = selectedJob.role;
    document.getElementById('modal-company').textContent = selectedJob.company;
    document.getElementById('modal-type').textContent = selectedJob.type;
    
    const prodiText = Array.isArray(selectedJob.prodi) 
        ? selectedJob.prodi.join(', ') 
        : selectedJob.prodi;
    document.getElementById('modal-prodi').textContent = prodiText;
    
    document.getElementById('modal-description').textContent = selectedJob.description;
    
    // Populate requirements
    const reqList = document.getElementById('modal-requirements');
    reqList.innerHTML = selectedJob.requirements.map(req => 
        `<li class="flex items-start gap-2">
            <span class="text-blue-600 mt-1">✓</span>
            <span>${req}</span>
        </li>`
    ).join('');

    // Populate required skills if available
    const requiredSkillsSection = document.getElementById('required-skills-section');
    const modalSkills = document.getElementById('modal-skills');
    
    if (selectedJob.requiredSkills && selectedJob.requiredSkills.length > 0) {
        requiredSkillsSection.classList.remove('hidden');
        
        // Calculate skill match
        const { matchedSkills, totalSkills, percentage } = calculateSkillMatch(selectedJob.requiredSkills);
        
        modalSkills.innerHTML = `
            <div class="mb-4 p-4 bg-blue-50 rounded-xl">
                <div class="flex items-center justify-between mb-2">
                    <span class="font-semibold text-gray-900">Skill Match</span>
                    <span class="text-2xl font-bold text-blue-600">${percentage}%</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                    <div class="bg-blue-600 h-2 rounded-full transition-all duration-500" style="width: ${percentage}%"></div>
                </div>
                <p class="text-sm text-gray-600 mt-2">${matchedSkills} dari ${totalSkills} skill sudah kamu kuasai</p>
            </div>
            
            ${selectedJob.requiredSkills.map(skillGroup => {
                const roadmap = skillRoadmaps[skillGroup.role];
                const level = roadmap.levels.find(l => l.level === skillGroup.level);
                
                return `
                    <div class="border border-gray-200 rounded-xl p-4">
                        <div class="flex items-center gap-2 mb-3">
                            <div class="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                ${skillGroup.level}
                            </div>
                            <div>
                                <h5 class="font-semibold text-sm">${level.title}</h5>
                                <p class="text-xs text-gray-500">${roadmap.title}</p>
                            </div>
                        </div>
                        <div class="space-y-2">
                            ${skillGroup.skills.map(skillName => {
                                const skill = level.skills.find(s => s.name === skillName);
                                const isCompleted = isSkillCompleted(skillGroup.role, skillGroup.level, skillName);
                                
                                return `
                                    <div class="flex items-center gap-2 text-sm">
                                        <input type="checkbox" 
                                               class="skill-checkbox w-4 h-4 text-blue-600 rounded" 
                                               data-role="${skillGroup.role}" 
                                               data-level="${skillGroup.level}" 
                                               data-skill="${skillName}"
                                               ${isCompleted ? 'checked' : ''}>
                                        <span class="${isCompleted ? 'text-gray-900 font-medium' : 'text-gray-600'}">${skillName}</span>
                                        ${isCompleted ? '<span class="text-green-600 text-xs">✓</span>' : ''}
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>
                `;
            }).join('')}
        `;
        
        // Attach checkbox listeners
        modalSkills.querySelectorAll('.skill-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                const role = e.target.dataset.role;
                const level = parseInt(e.target.dataset.level);
                const skill = e.target.dataset.skill;
                toggleSkillCompletion(role, level, skill);
                
                // Refresh modal to update skill match
                openModal(selectedJob.id);
            });
        });
        
        // Attach view roadmap button listener
        const viewRoadmapBtn = document.getElementById('view-roadmap-btn');
        viewRoadmapBtn.onclick = () => {
            closeModal();
            
            // Get the primary role from required skills
            const primaryRole = selectedJob.requiredSkills[0].role;
            
            // Scroll to skill roadmap section
            document.getElementById('skill-roadmap').scrollIntoView({ behavior: 'smooth' });
            
            // Switch to the relevant role
            setTimeout(() => {
                document.querySelectorAll('.role-btn').forEach(btn => {
                    if (btn.dataset.role === primaryRole) {
                        btn.click();
                    }
                });
            }, 500);
        };
    } else {
        requiredSkillsSection.classList.add('hidden');
    }

    // Update save button state
    const isSaved = savedJobs.includes(selectedJob.id);
    const saveIcon = saveJobBtn.querySelector('svg');
    if (isSaved) {
        saveJobBtn.classList.add('border-blue-600', 'text-blue-600');
        saveIcon.setAttribute('fill', 'currentColor');
    } else {
        saveJobBtn.classList.remove('border-blue-600', 'text-blue-600');
        saveIcon.setAttribute('fill', 'none');
    }

    // Show modal
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
}

// Close Modal Function
function closeModal() {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = 'auto';
    selectedJob = null;
}

// Handle Apply Function
function handleApply() {
    if (!selectedJob) return;

    Swal.fire({
        title: 'Konfirmasi Lamaran',
        html: `
            <p class="text-gray-600 mb-4">Anda akan melamar untuk posisi:</p>
            <p class="font-bold text-xl text-gray-900 mb-2">${selectedJob.role}</p>
            <p class="text-gray-600">di ${selectedJob.company}</p>
        `,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#2563eb',
        cancelButtonColor: '#6b7280',
        confirmButtonText: 'Ya, Lamar!',
        cancelButtonText: 'Batal',
        customClass: {
            popup: 'rounded-2xl',
            confirmButton: 'rounded-xl px-6 py-3 font-bold',
            cancelButton: 'rounded-xl px-6 py-3 font-bold'
        }
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: 'Berhasil!',
                html: `
                    <p class="text-gray-600 mb-2">Lamaran Anda untuk posisi <strong>${selectedJob.role}</strong> telah terkirim.</p>
                    <p class="text-gray-600">Tim ${selectedJob.company} akan menghubungi Anda segera.</p>
                `,
                icon: 'success',
                confirmButtonColor: '#2563eb',
                confirmButtonText: 'Oke',
                customClass: {
                    popup: 'rounded-2xl',
                    confirmButton: 'rounded-xl px-6 py-3 font-bold'
                }
            });
            closeModal();
        }
    });
}

// Handle Save from Modal
function handleSaveFromModal() {
    if (!selectedJob) return;
    toggleSaveJob(selectedJob.id);
    
    // Update button state
    const isSaved = savedJobs.includes(selectedJob.id);
    const saveIcon = saveJobBtn.querySelector('svg');
    if (isSaved) {
        saveJobBtn.classList.add('border-blue-600', 'text-blue-600');
        saveIcon.setAttribute('fill', 'currentColor');
    } else {
        saveJobBtn.classList.remove('border-blue-600', 'text-blue-600');
        saveIcon.setAttribute('fill', 'none');
    }
}

// Toast Notification
function showToast(message, type = 'success') {
    Toastify({
        text: message,
        duration: 3000,
        gravity: 'top',
        position: 'right',
        style: {
            background: type === 'success' ? '#2563eb' : '#ef4444',
            borderRadius: '0.75rem',
            padding: '1rem 1.5rem',
            fontWeight: '600'
        }
    }).showToast();
}

// Attach Event Listeners
function attachEventListeners() {
    // Search and Filter
    searchInput.addEventListener('input', filterJobs);
    typeFilter.addEventListener('change', filterJobs);
    prodiFilter.addEventListener('change', filterJobs);

    // Modal Controls
    closeModalBtn.addEventListener('click', closeModal);
    applyBtn.addEventListener('click', handleApply);
    saveJobBtn.addEventListener('click', handleSaveFromModal);

    // Close modal on backdrop click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close modal on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            closeModal();
        }
    });
}


// ==================== SKILL TRACKING FUNCTIONS ====================

// Check if a skill is completed
function isSkillCompleted(role, level, skillName) {
    const key = `${role}-${level}-${skillName}`;
    return completedSkills[key] === true;
}

// Toggle skill completion
function toggleSkillCompletion(role, level, skillName) {
    const key = `${role}-${level}-${skillName}`;
    completedSkills[key] = !completedSkills[key];
    localStorage.setItem('completedSkills', JSON.stringify(completedSkills));
    
    if (completedSkills[key]) {
        showToast(`✅ ${skillName} ditandai sebagai selesai!`, 'success');
    } else {
        showToast(`${skillName} ditandai belum selesai`, 'error');
    }
}

// Calculate skill match for a job
function calculateSkillMatch(requiredSkills) {
    let totalSkills = 0;
    let matchedSkills = 0;
    
    requiredSkills.forEach(skillGroup => {
        skillGroup.skills.forEach(skillName => {
            totalSkills++;
            if (isSkillCompleted(skillGroup.role, skillGroup.level, skillName)) {
                matchedSkills++;
            }
        });
    });
    
    const percentage = totalSkills > 0 ? Math.round((matchedSkills / totalSkills) * 100) : 0;
    
    return { matchedSkills, totalSkills, percentage };
}

// ==================== SKILL ROADMAP FEATURES ====================

let currentRole = 'web-dev';

// Initialize Skill Roadmap
function initSkillRoadmap() {
    console.log('Initializing Skill Roadmap...');
    console.log('Available roadmaps:', Object.keys(skillRoadmaps));
    renderSkillTree(currentRole);
    attachRoleButtonListeners();
}

// Render Skill Tree
function renderSkillTree(role) {
    console.log('Rendering skill tree for role:', role);
    const roadmap = skillRoadmaps[role];
    
    if (!roadmap) {
        console.error('Roadmap not found for role:', role);
        return;
    }
    
    const container = document.getElementById('skill-tree-container');
    
    container.innerHTML = `
        <div class="text-center mb-8">
            <h3 class="text-2xl font-bold mb-2">${roadmap.title}</h3>
            <p class="text-gray-600">${roadmap.description}</p>
        </div>
        
        <div class="space-y-8">
            ${roadmap.levels.map((level, index) => `
                <div class="skill-level" style="animation: fadeInUp 0.6s ease-out ${index * 0.1}s both">
                    <div class="flex items-center gap-4 mb-4">
                        <div class="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                            ${level.level}
                        </div>
                        <div>
                            <h4 class="text-xl font-bold">${level.title}</h4>
                            <p class="text-sm text-gray-600">Level ${level.level}</p>
                        </div>
                    </div>
                    
                    <div class="grid md:grid-cols-3 gap-4 ml-16">
                        ${level.skills.map((skill, skillIndex) => {
                            const isCompleted = isSkillCompleted(role, level.level, skill.name);
                            return `
                            <div class="skill-card bg-white border-2 ${isCompleted ? 'border-green-500 bg-green-50' : 'border-gray-200'} rounded-xl p-6 hover:border-blue-600 hover:shadow-lg transition cursor-pointer" data-role="${role}" data-level="${level.level}" data-skill="${skillIndex}">
                                <div class="flex items-start justify-between mb-3">
                                    <h5 class="font-bold text-lg">${skill.name}</h5>
                                    <input type="checkbox" 
                                           class="skill-complete-checkbox w-5 h-5 text-green-600 rounded" 
                                           ${isCompleted ? 'checked' : ''}
                                           data-role="${role}" 
                                           data-level="${level.level}" 
                                           data-skill-name="${skill.name}">
                                </div>
                                <p class="text-sm text-gray-600 mb-4">${skill.description}</p>
                                <div class="flex flex-wrap gap-2 mb-3">
                                    ${skill.resources.map(resource => `
                                        <span class="text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded-full">${resource}</span>
                                    `).join('')}
                                </div>
                                <button class="learn-skill-btn w-full py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition text-sm">
                                    ${isCompleted ? '✓ Selesai' : 'Mulai Belajar'}
                                </button>
                            </div>
                        `;
                        }).join('')}
                    </div>
                </div>
            `).join('')}
        </div>
    `;
    
    // Attach skill card listeners
    document.querySelectorAll('.skill-card').forEach(card => {
        const learnBtn = card.querySelector('.learn-skill-btn');
        const checkbox = card.querySelector('.skill-complete-checkbox');
        
        // Prevent checkbox click from triggering card click
        checkbox.addEventListener('click', (e) => {
            e.stopPropagation();
        });
        
        checkbox.addEventListener('change', (e) => {
            const role = e.target.dataset.role;
            const level = parseInt(e.target.dataset.level);
            const skillName = e.target.dataset.skillName;
            toggleSkillCompletion(role, level, skillName);
            renderSkillTree(currentRole); // Re-render to update UI
        });
        
        learnBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const role = card.dataset.role;
            const level = parseInt(card.dataset.level);
            const skillIndex = parseInt(card.dataset.skill);
            showSkillDetail(role, level, skillIndex);
        });
    });
}

// Show Skill Detail Modal
function showSkillDetail(role, level, skillIndex) {
    const roadmap = skillRoadmaps[role];
    const levelData = roadmap.levels.find(l => l.level === level);
    const skill = levelData.skills[skillIndex];
    
    Swal.fire({
        title: skill.name,
        html: `
            <div class="text-left">
                <p class="text-gray-600 mb-4">${skill.description}</p>
                <h4 class="font-bold mb-2">📚 Learning Resources:</h4>
                <ul class="space-y-2 mb-4">
                    ${skill.resources.map(resource => `
                        <li class="flex items-center gap-2">
                            <span class="text-blue-600">→</span>
                            <span>${resource}</span>
                        </li>
                    `).join('')}
                </ul>
                <p class="text-sm text-gray-500">💡 Klik "Mulai Belajar" untuk menandai skill ini sebagai sedang dipelajari!</p>
            </div>
        `,
        icon: 'info',
        confirmButtonColor: '#2563eb',
        confirmButtonText: 'Mulai Belajar',
        showCancelButton: true,
        cancelButtonText: 'Tutup',
        customClass: {
            popup: 'rounded-2xl',
            confirmButton: 'rounded-xl px-6 py-3 font-bold',
            cancelButton: 'rounded-xl px-6 py-3 font-bold'
        }
    }).then((result) => {
        if (result.isConfirmed) {
            showToast(`🚀 Mulai belajar ${skill.name}! Semangat!`, 'success');
        }
    });
}

// Attach Role Button Listeners
function attachRoleButtonListeners() {
    document.querySelectorAll('.role-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            document.querySelectorAll('.role-btn').forEach(b => {
                b.classList.remove('active', 'bg-blue-600', 'text-white');
                b.classList.add('bg-gray-100', 'text-gray-700');
            });
            btn.classList.add('active', 'bg-blue-600', 'text-white');
            btn.classList.remove('bg-gray-100', 'text-gray-700');
            
            // Render new skill tree
            currentRole = btn.dataset.role;
            renderSkillTree(currentRole);
        });
    });
}

// ==================== PORTFOLIO SCORECARD FEATURES ====================

let portfolioScore = 0;

// Initialize Portfolio Scorecard
function initPortfolioScorecard() {
    attachPortfolioCheckListeners();
}

// Attach Portfolio Check Listeners
function attachPortfolioCheckListeners() {
    document.querySelectorAll('.portfolio-check').forEach(checkbox => {
        checkbox.addEventListener('change', updatePortfolioScore);
    });
}

// Update Portfolio Score
function updatePortfolioScore() {
    const checkboxes = document.querySelectorAll('.portfolio-check');
    let score = 0;
    
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            const scoreValue = parseInt(checkbox.parentElement.querySelector('.text-gray-500').textContent.replace('+', ''));
            score += scoreValue;
        }
    });
    
    portfolioScore = score;
    
    // Update UI
    document.getElementById('portfolio-score').textContent = score;
    document.getElementById('progress-text').textContent = `${score}/100`;
    document.getElementById('progress-bar').style.width = `${score}%`;
    
    // Update recommendation
    const recommendation = document.getElementById('recommendation');
    if (score === 0) {
        recommendation.innerHTML = '<p class="text-blue-800 font-medium">💡 Mulai dengan mencentang checklist di atas untuk meningkatkan skor portfolio kamu!</p>';
        recommendation.className = 'p-4 bg-blue-50 border border-blue-200 rounded-xl';
    } else if (score < 50) {
        recommendation.innerHTML = '<p class="text-yellow-800 font-medium">⚠️ Portfolio kamu masih perlu banyak improvement. Lengkapi checklist untuk meningkatkan peluang diterima!</p>';
        recommendation.className = 'p-4 bg-yellow-50 border border-yellow-200 rounded-xl';
    } else if (score < 80) {
        recommendation.innerHTML = '<p class="text-orange-800 font-medium">📈 Lumayan! Tapi masih bisa lebih baik. Lengkapi semua checklist untuk hasil maksimal!</p>';
        recommendation.className = 'p-4 bg-orange-50 border border-orange-200 rounded-xl';
    } else if (score < 100) {
        recommendation.innerHTML = '<p class="text-green-800 font-medium">✨ Bagus! Portfolio kamu sudah cukup baik. Tinggal sedikit lagi untuk sempurna!</p>';
        recommendation.className = 'p-4 bg-green-50 border border-green-200 rounded-xl';
    } else {
        recommendation.innerHTML = '<p class="text-green-800 font-medium">🎉 Perfect! Portfolio kamu sudah siap untuk apply lowongan. Good luck!</p>';
        recommendation.className = 'p-4 bg-green-50 border border-green-200 rounded-xl';
        
        // Confetti effect
        showToast('🎉 Portfolio Score Perfect! Kamu siap apply lowongan!', 'success');
    }
}

// Update initialization
const originalInit = document.addEventListener;
document.addEventListener('DOMContentLoaded', () => {
    animateStats();
    renderProdi();
    renderMitraHasnur();
    renderMitraPolhas();
    renderSupported();
    populateProdiFilter();
    renderJobs(currentJobs);
    initSkillRoadmap(); // NEW
    initPortfolioScorecard(); // NEW
    attachEventListeners();
});
