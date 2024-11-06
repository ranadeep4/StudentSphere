const jobform = document.getElementById('jobForm');
const companyNameInput = document.getElementById('companyName')
const jobRoleInput = document.getElementById('jobRole');
const jobSalaryInput = document.getElementById('jobSalary');
const registrationEndDateInput = document.getElementById('registrationEndDate');
const registrationLinkInput = document.getElementById('registrationLink');
const jobList = document.getElementById('jobsList')
const descriptionInput = document.getElementById('description')

let jobs = [];
loadJobs();
if(jobform){
    jobform.addEventListener('submit',function(e){
        e.preventDefault();
        const companyName = companyNameInput.value;
        const jobRole =jobRoleInput.value;
        const jobSalary = jobSalaryInput.value; 
        const registrationEndDate = registrationEndDateInput.value;
        const registrationLink = registrationLinkInput.value; // Get registration link
        const description = descriptionInput.value;
        const job = {
            name: companyName,
            role:jobRole,
            salary:jobSalary,
            endDate: new Date(registrationEndDate),
            description:description,
            registrationLink:registrationLink,
            id: Date.now()
        };
        jobs.push(job);
        saveJobs();
        companyNameInput.value='';
        jobRoleInput.value='';
        jobSalaryInput.value='';
        registrationEndDateInput.value = '';
        descriptionInput.value='';
        registrationLinkInput.value = '';
        
        location.href='jobshome.html';
    });
    
}

if(jobList){
    displayJobs();
}

function saveJobs(){
    localStorage.setItem('jobs',JSON.stringify(jobs));
    console.log('Jobs saved:',jobs);
}

function loadJobs(){
    const storedjobs = localStorage.getItem('jobs');
    if(storedjobs){
        jobs = JSON.parse(storedjobs);
        console.log("Jobs loaded:",jobs);
    }
}

function displayJobs(){
    jobList.innerHTML='';
    const today = new Date();
    jobs.forEach(job=>{
        const jobEndDate = new Date(job.endDate);
        if(jobEndDate>=today){
            const listItem = document.createElement('div');
            listItem.className='job-item';
            const companyName = document.createElement('h2');
            companyName.className='company-name';
            companyName.innerHTML = `${job.name}  (Ends: ${jobEndDate.toLocaleDateString()})`;
            const jobRole = document.createElement('h3');
            jobRole.className = 'job-role';
            jobRole.innerHTML=`Role: ${job.role}`;
            const jobSalary = document.createElement('b');
            jobSalary.className='job-salary';
            jobSalary.innerHTML=`Expected Salary: ${job.salary}`
            const desc = document.createElement('p')
            desc.className='desc';
            desc.innerHTML = `<b style="color:crimson;"> Qualifications :</b> &nbsp &nbsp &nbsp${job.description}`
            const googleFormLink = document.createElement('a');
            googleFormLink.className = 'register-link';
            googleFormLink.innerText = 'Register';
            googleFormLink.href = job.registrationLink; 
            googleFormLink.target = '_blank'; 
            // const heading = document.createElement('h3');
            // heading.innerHTML = 'Qualifications :'
            // heading.className = 'Q-heading'
            const deleteButton = document.createElement('button');
            deleteButton.className='delete-button';
            deleteButton.innerText = 'Delete';
            deleteButton.onclick = function() {
                deleteJob(job.id);
            };
            listItem.append(companyName,jobRole,jobSalary,desc,googleFormLink,deleteButton);
            jobList.appendChild(listItem);
        }
    });
    if(jobList.children.length===0){
        const nojobsitem = document.createElement('div');
        nojobsitem.innerText='NO UPCOMING JOBS.';
        jobList.appendChild(nojobsitem);
    }
}

function deleteJob(id){
    jobs = jobs.filter(job=>job.id!==id);
    saveJobs();
    displayJobs();
}