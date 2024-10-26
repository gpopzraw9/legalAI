import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { DocumentTemplate, FormField } from '../../types';
import { useTemplateById } from '../../hooks/useDocuments';

interface DocumentFormProps {
  template: string;
  formData: any;
  onChange: (data: any) => void;
}

export const DocumentForm: React.FC<DocumentFormProps> = ({
  template,
  onChange,
}) => {
  const { data: templateData, isLoading, error } = useTemplateById(template);

  const generateValidationSchema = (fields: FormField[]) => {
    const schemaFields: Record<string, any> = {};
    
    fields.forEach((field) => {
      let fieldSchema = z.string();
      
      if (field.required) {
        fieldSchema = fieldSchema.min(1, `${field.label} is required`);
      }
      
      if (field.type === 'select' && field.options) {
        fieldSchema = z.enum(field.options as [string, ...string[]]);
      }
      
      schemaFields[field.id] = field.required ? fieldSchema : fieldSchema.optional();
    });

    return z.object(schemaFields);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(
      templateData ? generateValidationSchema(templateData.fields) : z.object({})
    ),
    mode: 'onChange',
  });

  React.useEffect(() => {
    const subscription = watch((value) => onChange(value));
    return () => subscription.unsubscribe();
  }, [watch, onChange]);

  if (isLoading) {
    return (
      <div className="space-y-4 animate-pulse">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error || !templateData) {
    return (
      <div className="bg-red-50 p-4 rounded-lg">
        <p className="text-red-600">
          Error loading form: {error instanceof Error ? error.message : 'Unknown error'}
        </p>
      </div>
    );
  }

  const renderField = (field: FormField) => {
    const errorMessage = errors[field.id]?.message as string;

    switch (field.type) {
      case 'textarea':
        return (
          <textarea
            {...register(field.id)}
            className={`input-field min-h-[100px] ${
              errorMessage ? 'border-red-500 focus:ring-red-500' : ''
            }`}
            placeholder={`Enter ${field.label.toLowerCase()}`}
          />
        );

      case 'select':
        return (
          <select
            {...register(field.id)}
            className={`input-field ${
              errorMessage ? 'border-red-500 focus:ring-red-500' : ''
            }`}
          >
            <option value="">Select {field.label.toLowerCase()}</option>
            {field.options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );

      case 'date':
        return (
          <input
            type="date"
            {...register(field.id)}
            className={`input-field ${
              errorMessage ? 'border-red-500 focus:ring-red-500' : ''
            }`}
          />
        );

      default:
        return (
          <input
            type="text"
            {...register(field.id)}
            className={`input-field ${
              errorMessage ? 'border-red-500 focus:ring-red-500' : ''
            }`}
            placeholder={`Enter ${field.label.toLowerCase()}`}
          />
        );
    }
  };

  return (
    <form className="space-y-6">
      {templateData.fields.map((field) => (
        <div key={field.id} className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </label>
          {renderField(field)}
          {errors[field.id] && (
            <p className="text-sm text-red-600">
              {errors[field.id]?.message as string}
            </p>
          )}
        </div>
      ))}
    </form>
  );
};