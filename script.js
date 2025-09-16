const rooms = [301,302,303,304,305,308];
const teachers = ["Alminar","Baysa","Dela Cruz","Dominguez","Edquilag","Bartolome","Ibarrola","Agbayani","Teleg","Rubaya","Manliguis","Abarra"];

rooms.forEach(room => {
    let option = document.createElement("option");
    option.value = room;
    option.innerText = room;
    document.getElementById("room").appendChild(option);
});

teachers.forEach(teacher => {
    let option = document.createElement("option");
    option.value = teacher;
    option.innerText = teacher;
    document.getElementById("teacher").appendChild(option);
});

// Array to store each row as an object
const savedRows = [];

// Save button event: store row in object
document.getElementById("save").addEventListener("click", () => {
    let room = document.getElementById("room").value;
    let teacher = document.getElementById("teacher").value;
    let now = new Date();
    let dateTime = now.toLocaleString();
    savedRows.push({ room, teacher, dateTime });
    console.log(`Saved: Room: ${room}, Teacher: ${teacher}, Date & Time: ${dateTime}`);

    // Show notification
    let notification = document.createElement("div");
    notification.innerText = "Saved successfully!";
    notification.style.position = "fixed";
    notification.style.bottom = "20px";
    notification.style.right = "20px";
    notification.style.background = "#4caf50";
    notification.style.color = "#fff";
    notification.style.padding = "10px 20px";
    notification.style.borderRadius = "5px";
    notification.style.zIndex = "1000";
    document.body.appendChild(notification);

    setTimeout(() => {
        document.body.removeChild(notification);
    }, 2000);
});

// Function to write savedRows to CSV and download
function downloadSavedRowsAsCSV() {
    let csvContent = "data:text/csv;charset=utf-8,Room,Teacher,Date & Time\n";
    savedRows.forEach(row => {
        csvContent += `${row.room},${row.teacher},${row.dateTime}\n`;
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `checker_data_${new Date().toISOString().replace(/[:.]/g, "_")}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Show notification
    let notification = document.createElement("div");
    notification.innerText = "Download successful!";
    notification.style.position = "fixed";
    notification.style.bottom = "20px";
    notification.style.right = "20px";
    notification.style.background = "#2196f3";
    notification.style.color = "#fff";
    notification.style.padding = "10px 20px";
    notification.style.borderRadius = "5px";
    notification.style.zIndex = "1000";
    document.body.appendChild(notification);

    setTimeout(() => {
        document.body.removeChild(notification);
    }, 2000);
}

// Example: attach to a button with id "download"
document.getElementById("download").addEventListener("click", downloadSavedRowsAsCSV);
