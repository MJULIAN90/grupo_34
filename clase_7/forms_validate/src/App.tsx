import { useState, type ChangeEvent, type FormEvent } from "react";
import "./App.css";

type LoginFormState = {
  email: string;
  password: string;
};

const initialState: LoginFormState = {
  email: "",
  password: "",
};

type FieldsErrors = Partial<Record<keyof LoginFormState, string>>;

const MY_PASSWORD = "123456";

function App() {
  const [form, setForm] = useState<LoginFormState>(initialState);
  const [errors, setErrors] = useState<FieldsErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  function validate(form: LoginFormState): FieldsErrors {
    const errs: FieldsErrors = {};

    if (!form.email.includes("@") || !form.email.includes(".")) {
      errs.email = "Ingresá un email válido.";
    }

    if (
      !form.password ||
      form.password.length < 6 ||
      form.password !== MY_PASSWORD
    ) {
      errs.password =
        "La contraseña es invalidad o debe tener al menos 6 caracteres.";
    }

    // return {
    //   errs.email: "Ingresá un email válido."
    // }
    return errs;
  }

  async function mockLogin(data: LoginFormState) {
    await new Promise((resolve) => setTimeout(resolve, 3000));

    if (data.email === "fail@example.com") {
      throw new Error("Credenciales inválidas.");
    }
    return { ok: true };
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError(null);
    setSubmitSuccess(false);

    const nextErrors = validate(form);

    // nextErrors = {
    //   email: "Ingresá un email válido."
    // }
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    setIsSubmitting(true);
    try {
      await mockLogin(form);
      setSubmitSuccess(true);
      setForm(initialState); // limpiar sólo en éxito
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Error inesperado.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <h1>Formulario</h1>
      <form onSubmit={handleSubmit} noValidate>
        <div>
          <label htmlFor="email"> Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            autoComplete="email"
            required
            // ARIA
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? errors.email : undefined}
          />
          {errors.email && <p>{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="password"> password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            autoComplete="password"
            // required
            // ARIA
            aria-invalid={Boolean(errors.password)}
            aria-describedby={errors.password ? errors.password : undefined}
          />
          {errors.password && <p>{errors.password}</p>}
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Ingresando..." : "Ingresar"}
        </button>
      </form>
      {submitError && (
        <p role="alert" aria-live="assertive">
          {submitError}
        </p>
      )}
      {submitSuccess && (
        <p role="status" aria-live="polite">
          ¡Login exitoso!
        </p>
      )}
    </>
  );
}

export default App;
