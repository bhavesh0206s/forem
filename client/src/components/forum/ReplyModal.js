import { DownOutlined } from "@ant-design/icons";
import { Input } from "antd";
import TextArea from "antd/lib/input/TextArea";
import Modal from "antd/lib/modal/Modal";

const ReplyModal = ({visibleModal, confirmLoading, setVisibleModal, setConfirmLoading}) => {

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setVisibleModal(false);
      setConfirmLoading(false);
    }, 2000);
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
      <TextArea placeholder='Post reply...' rows={3} />
    </Modal>
  );
}
 
export default ReplyModal;