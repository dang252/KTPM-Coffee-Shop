import { useEffect, useState } from "react";
import HomeFooter from "../components/HomeFooter";
import { Form, Input, Select, Space, Button, DatePicker, InputNumber } from "antd";
import { useAppDispatch } from "../redux/hooks/hooks";
import { getAllProducts } from "../redux/reducers/product.reducer";
// import form from "antd/es/form";
import OrderNavAdmin from "../components/OrderNavAdmin";
import TextArea from "antd/es/input/TextArea";
import { toast } from "react-toastify";
import axios from "axios";

const Admin = () => {

    const [options, setOptions] = useState();

    const dispatchAsync = useAppDispatch();

    const [form] = Form.useForm();
    const { RangePicker } = DatePicker;


    const layout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 12 },
            md: { span: 12 },
            lg: { span: 12 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 12 },
            md: { span: 12 },
            lg: { span: 12 },
        },
    };

    const tailLayout = {
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 12, offset: 12 },
            md: { span: 12, offset: 8 },
            lg: { span: 12, offset: 8 },
        },
    };


    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = "The Coffee House | Admin";
    }, []);


    useEffect(() => {
        const getAllProduct = async () => {
            try {
                const res = await dispatchAsync(getAllProducts()).unwrap();
                const optionData = res.map((p: any) => {
                    return (
                        {
                            label: p.product.productName,
                            value: p.product.productId,
                        }
                    )
                })
                setOptions(optionData)
            }
            catch (error) {
                console.log("get all products", error)
            }
        };
        getAllProduct()
    }, [dispatchAsync])


    const onFinish = async (values: any) => {
        console.log(values);
        try {
            const data = {
                promotionName: values.promotionName,
                promotionDesc: values.promotionDesc,
                discountRate: values.discountRate,
                productIds: values.productIds,
                promotionType: "product",
                startDate: values.time[0],
                endDate: values.time[1],
            }

            await axios.post(
                `${import.meta.env.VITE_API_URL}/promotion/create`,
                data,
                {}
            );
            toast.success(
                "Create promotion successfully!"
            );
        } catch (err) {
            console.log("Register failed", err);
            toast.error("Create promotion failed!");
        }
    };

    const onReset = () => {
        form.resetFields();
    };

    return (
        <div className="flex flex-col">
            <OrderNavAdmin />
            <div className="w-[95%] xl:max-w-[3000px] min-h-[400px] z-10 mx-auto mt-[300px] md:mt-[150px] mb-[100px] flex flex-col items-center">
                <div className="font-black mb-5 text-3xl">CREATE NEW PROMOTION EVENT</div>
                <Form
                    {...layout}
                    form={form}
                    // name="control-hooks"
                    onFinish={onFinish}
                    style={{ maxWidth: 1200 }}
                >

                    <Form.Item
                        label="Promotion Name"
                        name="promotionName"
                        rules={[
                            { required: true, message: "Please Enter promotion username!" },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Description"
                        labelAlign="right"
                        name="promotionDesc"
                        rules={[
                            { required: true, message: "Please Enter promotion description!" },
                        ]}
                    >
                        <TextArea />
                    </Form.Item>
                    <Form.Item
                        label="Time"
                        name="time"
                        rules={[
                            { required: true, message: "Please Enter date!" },
                        ]}
                    >
                        <RangePicker />
                    </Form.Item>
                    <Form.Item
                        label="Discount Rate(%)"
                        name="discountRate"
                        rules={[
                            { required: true, message: "Please Enter Discount rate!" },
                        ]}
                    >
                        <InputNumber max={90} min={1} />
                    </Form.Item>
                    <Form.Item name="productIds" label="Products" rules={[{ required: true }]}>
                        <Select
                            placeholder="Select products"
                            mode="multiple"
                            allowClear
                            options={options}
                        >
                        </Select>
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Space>
                            <Button type="primary" htmlType="submit" className="bg-blue-700">
                                Submit
                            </Button>
                            <Button htmlType="button" onClick={onReset}>
                                Reset
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </div>
            <HomeFooter />
        </div>
    )
}

export default Admin