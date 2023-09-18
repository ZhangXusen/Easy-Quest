import { Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { FC, useEffect } from "react";
import { QuestionInfoPropsType } from "./type";

export const PropComponent: FC<QuestionInfoPropsType> = (
  props: QuestionInfoPropsType
) => {
  const { title, desc, disabled, onChange } = props;
  const [form] = Form.useForm();

  function handleValuesChange() {
    if (onChange) {
      onChange(form.getFieldsValue());
    }
  }

  useEffect(() => {
    form.setFieldsValue({ title, desc });
  }, [title, desc]);

  return (
    <Form
      form={form}
      layout="vertical"
      disabled={disabled}
      initialValues={{ title, desc }}
      onValuesChange={handleValuesChange}
    >
      <Form.Item
        label="标题"
        name="title"
        rules={[{ required: true, message: "标题不能为空！！！" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label={"描述"} name={"desc"}>
        <TextArea />
      </Form.Item>
    </Form>
  );
};
