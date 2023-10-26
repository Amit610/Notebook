import React from "react";

const About = () => {
  return (
    <div>
      <div>
        <h1>About Notes App </h1>
        <p className="mt-4">
          Welcome to NOTEBOOK, your trusted digital companion for note-taking
          and organization. Our mission is to empower you with a secure and
          convenient platform to capture your thoughts, ideas, and to-do lists.
          At NOTEBOOK, we believe in the power of personalized notes. Whether
          you're a professional managing tasks or a creative soul recording
          inspirations, our app offers you a safe and secure space to create,
          update, and organize your notes with ease. Our authentication and
          login system ensures that your notes are for your eyes only. We
          prioritize your privacy and data security, so you can use our app with
          confidence. With features like note updates and deletions, you have
          full control over your content. Start your journey towards enhanced
          productivity and organization with NOTEBOOK. Your notes, your way,
          securely stored in one place.
        </p>
      </div>
      <div className="mt-5">
        <h3>FAQ</h3>
      </div>
      <div class="accordion" id="accordionExample">
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button
              class="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              How do I create a new note in the app?
            </button>
          </h2>
          <div
            id="collapseOne"
            class="accordion-collapse collapse show"
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body">
              To create a new note, simply log in to your account. Once you're
              logged in, click on the "+ New Note" button. You'll be directed to
              a page where you can enter the title and content of your note.
              After that, just click "Save," and your new note will be stored
              securely in your account.
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >
              Can I access my notes from multiple devices?
            </button>
          </h2>
          <div
            id="collapseTwo"
            class="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body">
              Yes, you can access your notes from multiple devices. NOTEBOOK
              offers a cloud-based service, which means your notes are
              synchronized across all your devices. Simply log in with the same
              account on different devices, and you'll have your notes available
              whenever and wherever you need them.
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseThree"
              aria-expanded="false"
              aria-controls="collapseThree"
            >
              How can I ensure the security of my notes?
            </button>
          </h2>
          <div
            id="collapseThree"
            class="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body">
              We take data security seriously. Your notes are protected through
              a secure login system, and only you have access to them. We use
              industry-standard encryption to keep your information safe.
              Additionally, we regularly update our security measures to ensure
              the utmost protection of your notes
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
