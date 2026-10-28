"use client"
import useDynamicMutation from "@/api/use-post-data"
import FormikInput from "@/components/forms/input"
import FormikMaskedInput from "@/components/forms/masked-input"
import Logo from "@/components/logo"
import { Button } from "@/components/ui/button"
import { signInSchema, SignInSchemaType } from "@/validations/auth.schema"
import { Form, Formik } from "formik"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { IoIosArrowBack } from "react-icons/io"
import { toast } from "sonner"

function SingIn() {
    const postMutation = useDynamicMutation({})

    const handleLogin = async (values: SignInSchemaType) => {
        try {
            await postMutation.mutateAsync({
                url: `token/`,
                method: "POST",
                body: {
                    username: values.username,
                    password: values.password
                },
                onSuccess: (res) => {
                    signIn("credentials", {
                        data: JSON.stringify(res),
                        callbackUrl: "/overview",
                    });
                    toast.loading("Login Successful, Redirecting...");
                },
            });
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <div className="flex items-center justify-center h-screen w-full">
            <div className="flex flex-col gap-2 max-w-md w-full mx-auto">
                <Link
                    href="/"
                    className="text-sm flex items-center gap-1 font-medium text-primary hover:text-primary/80"
                >
                    <IoIosArrowBack size={18} /> Back to medicines
                </Link>
                <div className="flex flex-col gap-3 p-7 rounded-md border bg-white">
                    <Logo />

                    <p className="text-center text-sm">Login with username and password.</p>

                    <Formik
                        initialValues={{
                            username: "",
                            password: ""
                        }}
                        validationSchema={signInSchema}
                        onSubmit={(val) => handleLogin(val)}
                    >
                        {({ }) => {
                            return (
                                <Form className="flex flex-col gap-5">
                                    <FormikInput
                                        id="username"
                                        name="username"
                                        label="Username"
                                        // pattern="username"
                                        placeholder="Enter username"
                                    />
                                    <FormikMaskedInput
                                        id="password"
                                        name="password"
                                        label="Password"
                                        placeholder="Enter password"
                                        viewToggle
                                    />
                                    <div className="grid gap-3 mt-5">
                                        <Button
                                            size={"lg"}
                                            type="submit"
                                            disabled={postMutation.isPending}
                                        >
                                            {postMutation.isPending ? "Loading..." : "Login"}
                                        </Button>
                                    </div>
                                </Form>
                            )
                        }}
                    </Formik>
                </div>
            </div>
        </div>
    )
}

export default SingIn