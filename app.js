/* Data Store */
let myJobs = [
    { id: 1, company: 'Mobile First Corp', role: 'React Native Developer', loc: 'Remote', type: 'Full-time', pay: '$130k - $175k', info: 'Build cross-platform mobile applications using React Native. Work on products used by millions.', status: 'all' },
    { id: 2, company: 'WebFlow Agency', role: 'Web Designer & Developer', loc: 'Los Angeles, CA', type: 'Part-time', pay: '$80k - $120k', info: 'Create stunning web experiences for high-profile clients. Must have portfolio and experience.', status: 'all' },
    { id: 3, company: 'MegaCorp Solutions', role: 'JavaScript Developer', loc: 'New York, NY', type: 'Full-time', pay: '$130k - $170k', info: 'Build enterprise applications with JavaScript and modern frameworks.', status: 'all' },
    { id: 4, company: 'StartupXYZ', role: 'Full Stack Engineer', loc: 'Remote', type: 'Full-time', pay: '$120k - $160k', info: 'Join our fast-growing startup and work on our core platform.', status: 'all' },
    { id: 5, company: 'TechCorp Industries', role: 'Senior Frontend Developer', loc: 'San Francisco, CA', type: 'Full-time', pay: '$130k - $175k', info: 'Looking for an experienced Frontend Developer to build scalable web apps.', status: 'all' },
    { id: 6, company: 'DataViz Solutions', role: 'Data Specialist', loc: 'Boston, MA', type: 'Full-time', pay: '$125k - $165k', info: 'Transform complex data into compelling visualizations.', status: 'all' },
    { id: 7, company: 'CloudFirst Inc', role: 'Backend Developer', loc: 'Seattle, WA', type: 'Full-time', pay: '$140k - $190k', info: 'Design and maintain scalable backend systems using Python and AWS.', status: 'all' },
    { id: 8, company: 'Innovation Labs', role: 'UI/UX Engineer', loc: 'Austin, TX', type: 'Full-time', pay: '$110k - $150k', info: 'Create beautiful and functional user interfaces for our suite of products.', status: 'all' }
];

let activeTab = 'all';

/* Main Function */
function drawUI() {
    const listContainer = document.getElementById('cards-list');
    const emptyMsg = document.getElementById('no-data-view');
    listContainer.innerHTML = '';

    const itemsToShow = myJobs.filter(j => activeTab === 'all' ? true : j.status === activeTab);

    if (itemsToShow.length === 0) {
        emptyMsg.style.display = 'block';
    } else {
        emptyMsg.style.display = 'none';
        itemsToShow.forEach(job => {
            const card = document.createElement('div');
            card.className = 'job-card';
            
            // Handle dynamic class logic
            const labelClass = job.status === 'all' ? '' : job.status;
            
            card.innerHTML = `
                <button onclick="deleteJob(${job.id})" class="btn-delete" title="Remove Job">
                    <img src="assets/delete.png">
                </button>
                <h4>${job.company}</h4>
                <p style="color: #64748b; font-size: 14px; margin-top: 4px;">${job.role}</p>
                <div class="meta-info">${job.loc} • ${job.type} • ${job.pay}</div>
                <span class="status-tag ${labelClass}">${job.status === 'all' ? 'NOT APPLIED' : job.status.toUpperCase()}</span>
                <p class="job-desc">${job.info}</p>
                <div class="action-box">
                    <button onclick="updateJob(${job.id}, 'interview')" class="btn-action btn-interview">INTERVIEW</button>
                    <button onclick="updateJob(${job.id}, 'rejected')" class="btn-action btn-rejected">REJECTED</button>
                </div>
            `;
            listContainer.appendChild(card);
        });
    }
    syncStats();
}

/* Update Job Status Logic */
function updateJob(id, newStatus) {
    const target = myJobs.find(j => j.id === id);
    if (target) {
        target.status = newStatus;
        drawUI();
    }
}

/* Remove Job Logic */
function deleteJob(id) {
    myJobs = myJobs.filter(j => j.id !== id);
    drawUI();
}

/* Numbers with Dashboard */
function syncStats() {
    document.getElementById('total-stat').innerText = myJobs.length;
    document.getElementById('jobs-badge').innerText = myJobs.length + " jobs";
    document.getElementById('interview-stat').innerText = myJobs.filter(j => j.status === 'interview').length;
    document.getElementById('rejected-stat').innerText = myJobs.filter(j => j.status === 'rejected').length;
}

/* Switch Tabs */
function switchTab(name) {
    activeTab = name;
    document.querySelectorAll('.tab-link').forEach(btn => btn.classList.remove('active'));
    document.getElementById('tab-' + name).classList.add('active');
    drawUI();
}

/* Initial Load */
drawUI();