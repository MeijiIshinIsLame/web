import React from 'react'
import RegisterForm from './RegisterForm'
import Modal from '../../ui/components/Modal'

const RegisterModal = ({
  isOpen,
  onSuccess,
  onCancel,
}: {
  isOpen: boolean
  onSuccess: () => void
  onCancel: () => void
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onCancel}
      contentLabel="Create a new account"
    >
      <RegisterForm />
    </Modal>
  )
}

export default RegisterModal
