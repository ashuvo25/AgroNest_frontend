import React from 'react';

interface ContentModalProps {
  title: string;
  content: any;
  onClose: () => void;
}

export const ContentModal: React.FC<ContentModalProps> = ({ title, content, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-green-100 rounded-2xl w-full max-w-md mx-4 p-6 shadow-xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            ✕
          </button>
        </div>
        
        <div className="space-y-6">
          {content.sections?.map((section: any, index: number) => (
            <div key={index} className="space-y-3">
              <h3 className="font-medium text-gray-900">{section.title}</h3>
              <ul className="space-y-2">
                {section.items?.map((item: string, idx: number) => (
                  <li key={idx} className="text-sm text-gray-600 flex gap-2">
                    <span>•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {content.categories?.map((category: any, index: number) => (
            <div key={index} className="space-y-3">
              <h3 className="font-medium text-gray-900">{category.title}</h3>
              {category.questions && (
                <div className="space-y-4">
                  {category.questions.map((qa: any, idx: number) => (
                    <div key={idx} className="bg-gray-50 rounded-lg p-4">
                      <p className="font-medium text-gray-900 text-sm">{qa.q}</p>
                      <p className="text-sm text-gray-600 mt-1">{qa.a}</p>
                    </div>
                  ))}
                </div>
              )}
              {category.events && (
                <div className="space-y-3">
                  {category.events.map((event: any, idx: number) => (
                    <div key={idx} className="bg-gray-50 rounded-lg p-4">
                      <p className="font-medium text-gray-900">{event.title}</p>
                      <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                      <div className="flex gap-2 mt-2 text-xs text-gray-500">
                        <span>{event.date}</span>
                        <span>•</span>
                        <span>{event.location}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

interface ConfirmationModalProps {
  title: string;
  message: string;
  warning?: string;
  buttons: {
    confirm: string;
    cancel: string;
  };
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  title,
  message,
  warning,
  buttons,
  onConfirm,
  onCancel
}) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl w-full max-w-sm mx-4 p-6 shadow-xl">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">{title}</h2>
        <p className="text-gray-600">{message}</p>
        {warning && (
          <p className="text-orange-600 text-sm mt-2">{warning}</p>
        )}
        
        <div className="flex gap-3 mt-6">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            {buttons.cancel}
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            {buttons.confirm}
          </button>
        </div>
      </div>
    </div>
  );
};
