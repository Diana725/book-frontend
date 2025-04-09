import React, { useState } from "react";
import { Modal, Button, Form, InputGroup } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const DeleteAccountModal = ({ show, handleClose, handleDelete }) => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false); // ✅ New
  const navigate = useNavigate();

  const handleConfirmDelete = async () => {
    setLoading(true);
    setError("");
    try {
      await handleDelete(password); // Wait for delete to succeed
      setSuccess(true);
      setPassword("");
      setTimeout(() => {
        handleClose();
        navigate("/sign-up");
      }, 2500); // ✅ Wait 2.5s before redirecting
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <div
        style={{
          background: "linear-gradient(to bottom, #272861, #2D3B79)",
          color: "#fff",
        }}
      >
        <Modal.Header closeButton closeVariant="white">
          <Modal.Title>Confirm Account Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {success ? (
            <p className="text-success fw-bold">
              ✅ Account deleted successfully. Redirecting to sign-up...
            </p>
          ) : (
            <>
              <p>
                This action is permanent. Please enter your password to confirm:
              </p>
              <Form.Group controlId="formPassword">
                <InputGroup>
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                  />
                  <InputGroup.Text
                    style={{
                      backgroundColor: "#fff",
                      cursor: "pointer",
                    }}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </InputGroup.Text>
                </InputGroup>
              </Form.Group>
              {error && <p className="text-danger mt-2">{error}</p>}
            </>
          )}
        </Modal.Body>
        {!success && (
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={handleClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={handleConfirmDelete}
              disabled={loading}
            >
              {loading ? "Deleting..." : "Delete Account"}
            </Button>
          </Modal.Footer>
        )}
      </div>
    </Modal>
  );
};

export default DeleteAccountModal;
