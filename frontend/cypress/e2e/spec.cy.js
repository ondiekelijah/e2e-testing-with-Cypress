describe("Test contact form", () => {
  it("Visit, fill and submit form", () => {
    // Visit the page
    cy.visit("http://localhost:3000");

    // Intercepts the POST request
    cy.intercept("POST", "http://localhost:3000/api/contact", {
      statusCode: 200,
      body: {
        message: "Message sent successfully",
      },
    }).as("postMessage");

    // Fills out the form
    cy.get('[data-test="email"]').type("doe@gmail.com"); // Type email
    cy.get('[data-test="name"]').type("John Doe"); // Type name
    cy.get('[data-test="message"]').type("Hi, I'm John Doe"); // Type message
    cy.get('[data-test="submit"]').click(); // Click on submit button

    // Wait for the request to finish
    // cy.wait('@postMessage')

    // Check if the success message is displayed
    cy.get('[data-test="success-message"]')
      .should("exist")
      .contains("Message sent successfully");
  });
});
