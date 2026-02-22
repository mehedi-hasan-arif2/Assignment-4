/* Data Store */
var myJobs = [
    { id: 1, company: 'Mobile First Corp', role: 'React Native Developer', loc: 'Remote', type: 'Full-time', pay: '$130k - $175k', info: 'Build cross-platform mobile applications using React Native. Work on products used by millions.', status: 'all' },
    { id: 2, company: 'WebFlow Agency', role: 'Web Designer & Developer', loc: 'Los Angeles, CA', type: 'Part-time', pay: '$80k - $120k', info: 'Create stunning web experiences for high-profile clients. Must have portfolio and experience.', status: 'all' },
    { id: 3, company: 'MegaCorp Solutions', role: 'JavaScript Developer', loc: 'New York, NY', type: 'Full-time', pay: '$130k - $170k', info: 'Build enterprise applications with JavaScript and modern frameworks.', status: 'all' },
    { id: 4, company: 'StartupXYZ', role: 'Full Stack Engineer', loc: 'Remote', type: 'Full-time', pay: '$120k - $160k', info: 'Join our fast-growing startup and work on our core platform.', status: 'all' },
    { id: 5, company: 'TechCorp Industries', role: 'Senior Frontend Developer', loc: 'San Francisco, CA', type: 'Full-time', pay: '$130k - $175k', info: 'Looking for an experienced Frontend Developer to build scalable web apps.', status: 'all' },
    { id: 6, company: 'DataViz Solutions', role: 'Data Specialist', loc: 'Boston, MA', type: 'Full-time', pay: '$125k - $165k', info: 'Transform complex data into compelling visualizations.', status: 'all' },
    { id: 7, company: 'CloudFirst Inc', role: 'Backend Developer', loc: 'Seattle, WA', type: 'Full-time', pay: '$140k - $190k', info: 'Design and maintain scalable backend systems using Python and AWS.', status: 'all' },
    { id: 8, company: 'Innovation Labs', role: 'UI/UX Engineer', loc: 'Austin, TX', type: 'Full-time', pay: '$110k - $150k', info: 'Create beautiful and functional user interfaces for our suite of products.', status: 'all' }
];

var activeTab = "all";

/* UI Section */
function drawUI() {
    var listContainer = document.getElementById("cards-list");
    var emptyMsg = document.getElementById("no-data-view");

    listContainer.innerHTML = "";
    var itemsToShow = [];

    /* Filter jobs based on active tab */
    for (var i = 0; i < myJobs.length; i++) {
        if (activeTab === "all") {
            itemsToShow.push(myJobs[i]);
        } else if (myJobs[i].status === activeTab) {
            itemsToShow.push(myJobs[i]);
        }
    }

    /* Show empty message if no data */
    if (itemsToShow.length === 0) {
        emptyMsg.style.display = "block";
    } else {
        emptyMsg.style.display = "none";

        for (var j = 0; j < itemsToShow.length; j++) {
            var job = itemsToShow[j];
            var card = document.createElement("div");
            card.className = "job-card";

            var labelClass = "";
            if (job.status !== "all") {
                labelClass = job.status;
            }

            var interviewDisabled = "";
            var rejectedDisabled = "";

            if (job.status === "interview") {
                interviewDisabled = "disabled";
            }
            if (job.status === "rejected") {
                rejectedDisabled = "disabled";
            }

            card.innerHTML =
                '<button onclick="deleteJob(' + job.id + ')" class="btn-delete" title="Remove Job">' +
                '<img src="assets/delete.png">' +
                '</button>' +
                '<h4>' + job.company + '</h4>' +
                '<p style="color: #64748b; font-size: 14px; margin-top: 4px;">' + job.role + '</p>' +
                '<div class="meta-info">' + job.loc + ' • ' + job.type + ' • ' + job.pay + '</div>' +
                '<span class="status-tag ' + labelClass + '">' +
                (job.status === "all" ? "NOT APPLIED" : job.status.toUpperCase()) +
                '</span>' +
                '<p class="job-desc">' + job.info + '</p>' +
                '<div class="action-box">' +
                '<button onclick="updateJob(' + job.id + ', \'interview\')" class="btn-action btn-interview" ' + interviewDisabled + '>INTERVIEW</button>' +
                '<button onclick="updateJob(' + job.id + ', \'rejected\')" class="btn-action btn-rejected" ' + rejectedDisabled + '>REJECTED</button>' +
                '</div>';

            listContainer.appendChild(card);
        }
    }
    syncStats();
}

/* Handle Status Change */
function updateJob(id, newStatus) {
    for (var i = 0; i < myJobs.length; i++) {
        if (myJobs[i].id === id) {
            myJobs[i].status = newStatus;
        }
    }
    drawUI();
}

/* Handle Delete Logic */
function deleteJob(id) {
    var newList = [];
    for (var i = 0; i < myJobs.length; i++) {
        if (myJobs[i].id !== id) {
            newList.push(myJobs[i]);
        }
    }
    myJobs = newList;
    drawUI();
}

/* Dashboard Calculation Section */
function syncStats() {
    var totalCount = myJobs.length;
    var interviewCount = 0;
    var rejectedCount = 0;
    var currentDisplayCount = 0;

    for (var i = 0; i < myJobs.length; i++) {
        /* Count for Stats Bar */
        if (myJobs[i].status === "interview") {
            interviewCount++;
        } else if (myJobs[i].status === "rejected") {
            rejectedCount++;
        }

        /* Count badge */
        if (activeTab === "all") {
            currentDisplayCount = totalCount;
        } else if (myJobs[i].status === activeTab) {
            currentDisplayCount++;
        }
    }

    document.getElementById("total-stat").innerText = totalCount;
    document.getElementById("interview-stat").innerText = interviewCount;
    document.getElementById("rejected-stat").innerText = rejectedCount;

    /* Dynamic badge text update */
    var badgeElement = document.getElementById("jobs-badge");
    badgeElement.innerText = currentDisplayCount + " of " + totalCount + " jobs";
}

/* Tab Switching */
function switchTab(name) {
    activeTab = name;
    var tabs = document.querySelectorAll(".tab-link");
    for (var i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove("active");
    }
    document.getElementById("tab-" + name).classList.add("active");
    drawUI();
}

drawUI();