document.addEventListener("DOMContentLoaded", function() {
    const tickBoxes = document.querySelectorAll(".tick-box");
    const progressValue = document.querySelector(".progress-value");
    const progressText = document.querySelector(".progress-text");
    const errorMessage = document.querySelector(".error");

    function updateProgress() {
      const totalTasks = tickBoxes.length;
      let checkedCount = 0;

      tickBoxes.forEach(box => {
        if (box.classList.contains("checked")) {
          checkedCount++;
        }
      });

      // Calculate the progress percentage
      const progressPercentage = (checkedCount / totalTasks) * 100;
      progressValue.style.width = progressPercentage + "%";

      // Update the overlaid progress text
      progressText.innerHTML = `<p>${checkedCount}/${totalTasks} Completed</p>`;

      // When all tasks are ticked, use a solid green and hide the error; otherwise, show a semi-transparent green and the error.
      if (checkedCount === totalTasks) {
        progressValue.style.backgroundColor = "#48A300";
        errorMessage.style.visibility = "hidden";
        errorMessage.style.opacity = "0";
      } else {
        progressValue.style.backgroundColor = "rgba(72, 163, 0, 0.5)";
        errorMessage.style.visibility = "visible";
        errorMessage.style.opacity = "1";
      }
    }

    // Attach click listeners to each tick box
    tickBoxes.forEach(box => {
      box.addEventListener("click", function() {
        // Toggle the tick-box state
        this.classList.toggle("checked");

        // Toggle the line-through decoration on the associated input
        const goalContainer = this.closest(".goal-container");
        const inputField = goalContainer.querySelector(".box-content");
        inputField.classList.toggle("completed");

        updateProgress();
      });
    });

    // Initialize the progress on page load
    updateProgress();
  });