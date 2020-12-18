import { Alert } from "antd";
import TextArea from "antd/lib/input/TextArea";
import Modal from "antd/lib/modal/Modal";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addReply } from "../../redux/actions/forum";

const ReplyModal = ({visibleModal, confirmLoading, setVisibleModal, setConfirmLoading, id, replyingTo}) => {

  const [reply, setReply] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const dispatch = useDispatch();
 
  const handleOk = () => {
    if(reply.length === 0){
      setError('Reply is Empty!');
    }else{
      setConfirmLoading(true);
      dispatch(addReply({reply, replyingTo}, id));
      setConfirmLoading(false);
      setSuccess(true)
    }
  };

  const handleCancel = () => {
    setVisibleModal(false);
    setError('');
    setSuccess(false);
    setReply('')
  };

  const handleReply = (e) => {
    setReply(e.target.value)
    setError('');
  }

  return (
    <Modal
      title={`Reply to ${replyingTo.name}`}
      visible={visibleModal}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      width={700}
    >
      <TextArea onChange={handleReply} placeholder='Post reply...' rows={3} />
      {error && (
        <Alert
          message="Error"
          description={error}
          type="error"
          showIcon
        />
      )}
      {success && (
        <Alert message="Success" type="success" showIcon />
      )}
    </Modal>
  );
}
 
export default ReplyModal;