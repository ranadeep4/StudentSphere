const eventForm = document.getElementById('eventForm');
const eventNameInput = document.getElementById('eventName');
const registrationEndDateInput = document.getElementById('registrationEndDate');
const registrationLinkInput = document.getElementById('registrationLink');
const eventList = document.getElementById('eventList');
const descriptionInput = document.getElementById('description')
const imagelinkInput = document.getElementById('imagelink')
// Array to hold events
let events = [];

// Load events from local storage and display them if on index.html
loadEvents();

if (eventForm) {
    // Set up the form submission
    eventForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent form submission
        const eventName = eventNameInput.value;
        const registrationEndDate = registrationEndDateInput.value;
        const registrationLink = registrationLinkInput.value; // Get registration link
        const description = descriptionInput.value;
        const imagelink = imagelinkInput.value; 

        // Create event object
        const event = {
            name: eventName,
            endDate: new Date(registrationEndDate),
            description:description,
            registrationLink: registrationLink, // Store registration link
            imagelink: imagelink ,
            id: Date.now() // Unique ID based on timestamp
        };
        events.push(event); // Add event to array
        saveEvents();
        
        // Clear input fields
        eventNameInput.value = '';
        registrationEndDateInput.value = '';
        descriptionInput.value='';
        registrationLinkInput.value = ''; // Clear registration link input
        imagelink.value ='';
        
        // Redirect back to main page after adding the event
        location.href = 'eventshome.html';
    });
}

// Display events in the list if on index.html
if (eventList) {
    displayEvents();
}

// Save events to local storage
function saveEvents() {
    localStorage.setItem('events', JSON.stringify(events));
    console.log("Events saved:", events); // Debugging log
}

// Load events from local storage
function loadEvents() {
    const storedEvents = localStorage.getItem('events');
    if (storedEvents) {
        events = JSON.parse(storedEvents);
        console.log("Events loaded:", events); // Debugging log
    }
}

// Display events
// Display events
function displayEvents() {
    console.log("Displaying events..."); // Debugging log
    eventList.innerHTML = ''; // Clear previous list
    const today = new Date();

    console.log("Current Date:", today); // Debugging log
    events.forEach(event => {
        // Ensure endDate is a Date object
        const eventEndDate = new Date(event.endDate);
        console.log("Checking event:", event); // Debugging log

        // Only display events that haven't expired
        if (eventEndDate >= today) {
            const listItem = document.createElement('div');
            listItem.className = 'event-item';
            const imageLink = document.createElement('img')
            imageLink.className = 'imgg';
            imageLink.src = event.imagelink
            imageLink.alt="Event Image"
            const imgdiv = document.createElement('div');
            imgdiv.className = 'img-div';
            imgdiv.append(imageLink)
            listItem.append(imgdiv)
            const eventName=document.createElement('h2')
            eventName.className='event-name'
            eventName.innerHTML = `${event.name}  (Ends: ${eventEndDate.toLocaleDateString()})`;
            // listItem.append(eventName)
            
            const desc = document.createElement('p')
            desc.className='desc';
            desc.innerHTML = `${event.description}`
            // listItem.append(desc)
            // const newLine = document.createElement('br')
            // eventList.appendChild(document.createElement('br'))
            // Create link to the registration link
            const googleFormLink = document.createElement('a');
            googleFormLink.className = 'register-link';
            googleFormLink.innerText = 'Register';
            googleFormLink.href = event.registrationLink; // Use the registration link from the event object
            googleFormLink.target = '_blank'; // Open in new tab
            // listItem.append(googleFormLink)
            // listItem.append(document.createElement('br'))
            // listItem.append(document.createElement('br'))
            // eventList.appendChild(document.createElement('br'))
            // Create delete button
            const deleteButton = document.createElement('button');
            deleteButton.className='delete-button';
            deleteButton.innerText = 'Delete';
            deleteButton.onclick = function() {
                deleteEvent(event.id);
            };
            const content = document.createElement('div')
            content.className='content';
            content.append(eventName,desc,googleFormLink,deleteButton)
            // eventList.appendChild(document.createElement('br'))
            listItem.append(content)
            eventList.appendChild(listItem);
            
        }
    });

    // Check if no events are displayed
    if (eventList.children.length === 0) {
        const noEventsItem = document.createElement('div');
        noEventsItem.innerText = 'No upcoming events.';
        eventList.appendChild(noEventsItem);
    }
}
function deleteEvent(id) {
    console.log("Deleting event with ID:", id); // Debugging log
    events = events.filter(event => event.id !== id);
    saveEvents();
    displayEvents();
}
