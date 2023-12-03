import React from 'react';
import { ToastContainer } from "react-bootstrap";
import Toast from 'react-bootstrap/Toast';

type MyToastProps = {
  show: boolean;
  onClose: () => void;
  message: string;
  variant: string; // toast variant
};

const ToastNotification: React.FC<MyToastProps> = ({ show, onClose, message, variant }) => {
  return (
    <div>
    <ToastContainer
      position="top-end"
    >
      <Toast 
        show={show} 
        onClose={onClose} 
        delay={5000} 
        autohide
        animation={true}
        bg={variant}
        className="p-3"
      >
        <Toast.Header>
          <strong className="me-auto">Notification</strong>
        </Toast.Header>
          <Toast.Body>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
    </div>
  );
};

export default ToastNotification;