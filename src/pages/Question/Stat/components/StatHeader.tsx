import { useGetPageInfo } from "@/hooks/useGetPageInfo";
import { CopyOutlined, LeftOutlined, QrcodeOutlined } from "@ant-design/icons";
import {
  Button,
  Input,
  InputRef,
  Popover,
  Space,
  Tooltip,
  message,
} from "antd";
import Title from "antd/es/typography/Title";
import QRCode from "qrcode.react";
import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const StatHeader = () => {
  const { id } = useParams();
  const { title, isPublished } = useGetPageInfo();
  const navigator = useNavigate();
  const urlInputRef = useRef<InputRef>(null);
  function copy() {
    const inputEle = urlInputRef.current;
    if (inputEle == null) return;
    inputEle.select();
    document.execCommand("copy");
    message.success("复制成功");
  }
  function createQrCodeAndLink() {
    if (!isPublished) return null;
    // 拼接 url ，需要参考 C 端的规则
    const url = `http://localhost:3000/question/${id}`;
    // 定义二维码组件
    const QRCodeElem = (
      <div style={{ textAlign: "center" }}>
        <QRCode value={url} size={150} />
      </div>
    );

    return (
      <Space>
        <Input value={url} style={{ width: "300px" }} ref={urlInputRef} />
        <Tooltip title="拷贝链接">
          <Button icon={<CopyOutlined />} onClick={copy}></Button>
        </Tooltip>
        <Popover content={QRCodeElem}>
          <Button icon={<QrcodeOutlined />}></Button>
        </Popover>
      </Space>
    );
  }

  return (
    <div className="bg-white border-b border-solid border-[#e8e8e8] py-3">
      <div className="flex mx-6 my-0">
        <div className="flex-1">
          <Space>
            <Button
              type="link"
              icon={<LeftOutlined />}
              onClick={() => {
                navigator(-1);
              }}
            >
              返回
            </Button>
            <Title level={4} className="text-lg m-0 leading-none">
              {title}
            </Title>
          </Space>
        </div>
        <div className="flex-1 text-center">{createQrCodeAndLink()}</div>
        <div className="flex-1 text-right">
          <Button
            type="primary"
            onClick={() => {
              navigator(`/question/edit/${id}`);
            }}
          >
            编辑问卷
          </Button>
        </div>
      </div>
    </div>
  );
};
