export const returnMessageDesign = (
  header: string,
  message: string,
  footer: string
): string => {
  return `
    <div style="
      max-width: 600px;
      margin: 40px auto;
      padding: 32px;
      background-color: #f8f8f8;
      border: 1px solid #e0e0e0;
      border-radius: 12px;
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      color: #2e2e2e;
    ">
      <header style="text-align: center; margin-bottom: 24px;">
        <h2 style="margin: 0; font-size: 28px; font-weight: 600; color: #1a1a1a;">
          ${header}
        </h2>
      </header>

      <main style="margin-bottom: 24px;">
        <p style="font-size: 17px; line-height: 1.6; text-align: center; color: #4d4d4d;">
          ${message}
        </p>
      </main>

      <footer style="text-align: center; border-top: 1px solid #ddd; padding-top: 16px;">
        <p style="font-size: 14px; color: #888;">
          ${footer}
        </p>
      </footer>
    </div>
  `;
};
