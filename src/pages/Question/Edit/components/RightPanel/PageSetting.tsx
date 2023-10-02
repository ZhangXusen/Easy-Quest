import { useGetPageInfo } from "@/hooks/useGetPageInfo";
import { resetPageInfo } from "@/store/pageInfo";
import { Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const PageSetting = () => {
  const pageInfo = useGetPageInfo();
  const [form] = useForm();
  const dispatch = useDispatch();
  function handleValuesChange() {
    dispatch(resetPageInfo(form.getFieldsValue()));
  }

  /* 实时更新表单内容 */
  useEffect(() => {
    form.setFieldsValue(pageInfo);
  }, [pageInfo]);
  return (
    <Form
      layout="vertical"
      initialValues={pageInfo}
      onValuesChange={handleValuesChange}
      form={form}
    >
      <Form.Item
        name="title"
        label="问卷标题"
        rules={[{ required: true, message: "请输入标题" }]}
      >
        <Input placeholder="请输入标题" />
      </Form.Item>
      <Form.Item name="desc" label="问卷描述">
        <TextArea placeholder="问卷描述..." />
      </Form.Item>
      <Form.Item name="css" label="css">
        <TextArea placeholder="请输入 CSS 样式代码..." />
      </Form.Item>
      <Form.Item name="js" label="js">
        <TextArea placeholder="请输入 JS 脚本代码..." />
      </Form.Item>
    </Form>
  );
};
