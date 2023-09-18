import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Form, Switch } from "antd";
import TextArea from "antd/es/input/TextArea";
import { FC, useEffect } from "react";
import { QuestionParagraphPropsType } from "./type";

export const PropComponent: FC<QuestionParagraphPropsType> = (
  props: QuestionParagraphPropsType
) => {
  const { text, center, onChange, disabled } = props;
  const [form] = Form.useForm();
  function handleChange() {
    if (onChange) {
      onChange(form.getFieldsValue());
    }
  }
  useEffect(() => {
    form.setFieldsValue({ text, center });
  }, [text, center]);
  return (
    <Form
      layout="vertical"
      initialValues={{ text, center }}
      form={form}
      onValuesChange={handleChange}
      disabled={disabled}
    >
      <Form.Item
        label="段落内容"
        name="text"
        rules={[{ required: true, message: "必填" }]}
      >
        <TextArea />
      </Form.Item>
      <Form.Item label="是否居中" name="center" valuePropName="checked">
        <Switch
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
        />
      </Form.Item>
    </Form>
  );
};
