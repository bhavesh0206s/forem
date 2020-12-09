import { DownOutlined } from "@ant-design/icons";
import { Input } from "antd";
import TextArea from "antd/lib/input/TextArea";
import Modal from "antd/lib/modal/Modal";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addReply } from "../../redux/actions/forum";

const ReplyModal = ({visibleModal, confirmLoading, setVisibleModal, setConfirmLoading, id}) => {

  const [reply, setReply] = useState('');

  const dispatch = useDispatch();
 
  const handleOk = () => {
    setConfirmLoading(true);
    dispatch(addReply({reply}, id))
    setVisibleModal(false);
    setConfirmLoading(false);
  };

  const handleCancel = () => {
    setVisibleModal(false);
  };

  return (
    <Modal
      title={`Reply to ${'Bhavesh'}`}
      visible={visibleModal}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      width={700}
    >
      <TextArea onChange={(e) => setReply(e.target.value)} placeholder='Post reply...' rows={3} />
    </Modal>
  );
}
 
export default ReplyModal;