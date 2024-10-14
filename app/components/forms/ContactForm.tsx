import React from 'react';

interface CustomFormProps {
  formTitle: string;
  backgroundColor: string;
  textColor: string;
  buttonColor: string;
  buttonTextColor: string;
  showNameField: boolean;
  showPhoneField: boolean;
}

export const CustomForm: React.FC<CustomFormProps> = ({
  formTitle,
  backgroundColor,
  textColor,
  buttonColor,
  buttonTextColor,
  showNameField,
  showPhoneField,
}) => {
  return (
    <div className="max-w-md mx-auto p-6 rounded-lg" style={{ backgroundColor, color: textColor }}>
      <h2 className="text-2xl font-bold mb-4">{formTitle}</h2>
      <form>
        {showNameField && (
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full px-3 py-2 border rounded-md"
              style={{ backgroundColor, color: textColor }}
              required
            />
          </div>
        )}
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full px-3 py-2 border rounded-md"
            style={{ backgroundColor, color: textColor }}
            required
          />
        </div>
        {showPhoneField && (
          <div className="mb-4">
            <label htmlFor="phone" className="block mb-2">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="w-full px-3 py-2 border rounded-md"
              style={{ backgroundColor, color: textColor }}
            />
          </div>
        )}
        <div className="mb-4">
          <label htmlFor="message" className="block mb-2">Message</label>
          <textarea
            id="message"
            name="message"
            rows={4}
            className="w-full px-3 py-2 border rounded-md"
            style={{ backgroundColor, color: textColor }}
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 rounded-md"
          style={{ backgroundColor: buttonColor, color: buttonTextColor }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export const customFormConfig = {
  name: 'CustomForm',
  component: CustomForm,
  defaultProps: {
    formTitle: 'Contact Us',
    backgroundColor: '#f3f4f6',
    textColor: '#1f2937',
    buttonColor: '#3b82f6',
    buttonTextColor: '#ffffff',
    showNameField: true,
    showPhoneField: false,
  },
  customizableProps: {
    formTitle: { type: 'text' as const, label: 'Form Title' },
    backgroundColor: { type: 'color' as const, label: 'Background Color' },
    textColor: { type: 'color' as const, label: 'Text Color' },
    buttonColor: { type: 'color' as const, label: 'Button Color' },
    buttonTextColor: { type: 'color' as const, label: 'Button Text Color' },
    showNameField: { type: 'boolean' as const, label: 'Show Name Field' },
    showPhoneField: { type: 'boolean' as const, label: 'Show Phone Field' },
  },
  description: 'A customizable form component with adjustable fields and styling.',
};