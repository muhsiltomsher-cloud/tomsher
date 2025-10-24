import React from 'react';

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({ 
  children, 
  className = '', 
  containerClassName = '' 
}) => {
  return (
    <section className={className}>
      <div className={`container mx-auto px-4 ${containerClassName}`}>
        {children}
      </div>
    </section>
  );
};

export default SectionWrapper;
