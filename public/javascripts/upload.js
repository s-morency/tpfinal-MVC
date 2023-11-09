document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("upload-form");
    const uploadMessage = document.getElementById("upload-message");
  
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
  
      // Show the "Please wait" message
      uploadMessage.style.display = "block";
  
      // Disable the form submission button
      const submitButton = form.querySelector('button[type="submit"]');
      submitButton.disabled = true;
  
      try {
        // Use AJAX to submit the form asynchronously
        const response = await fetch(form.action, {
          method: "POST",
          body: new FormData(form),
        });
  
        // Check if the upload is done
        if (response.ok) {
          // Hide the "Please wait" message
          uploadMessage.style.display = "none";
  
          // Reload the page or redirect as needed
          location.href = "/videos/"; // For example, reload the page
        } else {
          // Handle error response
          console.error("Upload error:", response.statusText);
        }
      } catch (error) {
        console.error("Upload error:", error);
      } finally {
        // Re-enable the form submission button
        submitButton.disabled = false;
      }
    });
});
  