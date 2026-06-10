import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { Button } from "../../components/ui/Button/Button";
import { Input } from "../../components/ui/Input/Input";
import { Tabs } from "../../components/ui/Tabs/Tabs";
import styles from "./HomeScreen.module.css";

const usernameSchema = z
  .string()
  .min(1, "Nombre obligatorio")
  .min(3, "El nombre debe tener al menos 3 caracteres");

const gameCodeSchema = z
  .string()
  .min(1, "Código obligatorio")
  .length(6, "El código debe tener exactamente 6 caracteres");

export function HomeScreen() {
  const [activeMode, setActiveMode] = useState<"create" | "join">("create");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [modifiedSinceSubmit, setModifiedSinceSubmit] = useState<
    Record<string, boolean>
  >({});

  const form = useForm({
    defaultValues: {
      username: "",
      gameCode: "",
    },
    onSubmit: async ({ value }) => {
      console.log("Modo:", activeMode);
      console.log("Usuario:", value.username);
      if (activeMode === "join") {
        console.log("Código:", value.gameCode);
      }
    },
  });

  const handleTabChange = (mode: "create" | "join") => {
    setActiveMode(mode);
    setHasSubmitted(false);
    setModifiedSinceSubmit({});
    form.reset();
  };

  const getErrorMessage = (errors: unknown[]) => {
    if (!errors || errors.length === 0) return undefined;
    const error = errors[0];
    if (typeof error === "string") return error;
    if (error && typeof error === "object" && "message" in error)
      return String((error as { message: string }).message);
    return String(error || "Error de validación");
  };

  return (
    <div className={styles.screenWrapper}>
      <main className={styles.card}>
        <header className={styles.header}>
          <h1>QUIZ-CLASH</h1>
          <p>¡Bienvenido al Juego!</p>
        </header>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setHasSubmitted(true);
            setModifiedSinceSubmit({});
            form.handleSubmit();
          }}
          className={styles.formContainer}
        >
          <Tabs activeTab={activeMode} onTabChange={handleTabChange} />

          <form.Field
            name="username"
            validators={{
              onChange: usernameSchema,
            }}
            children={(field) => (
              <Input
                label="Nombre de usuario"
                placeholder="Elige tu nombre de jugador"
                value={field.state.value}
                onChange={(e) => {
                  setModifiedSinceSubmit((prev) => ({
                    ...prev,
                    username: true,
                  }));
                  field.handleChange(e.target.value);
                }}
                onBlur={field.handleBlur}
                error={
                  hasSubmitted && !modifiedSinceSubmit.username
                    ? getErrorMessage(field.state.meta.errors)
                    : undefined
                }
              />
            )}
          />

          {activeMode === "join" && (
            <form.Field
              name="gameCode"
              validators={{
                onChange: gameCodeSchema,
              }}
              children={(field) => (
                <Input
                  label="Código de la partida"
                  placeholder="Introduce el código para unirte"
                  value={field.state.value}
                  onChange={(e) => {
                    setModifiedSinceSubmit((prev) => ({
                      ...prev,
                      gameCode: true,
                    }));
                    field.handleChange(e.target.value);
                  }}
                  onBlur={field.handleBlur}
                  error={
                    hasSubmitted && !modifiedSinceSubmit.gameCode
                      ? getErrorMessage(field.state.meta.errors)
                      : undefined
                  }
                />
              )}
            />
          )}

          <Button type="submit">
            {activeMode === "create" ? "COMENZAR A JUGAR" : "UNIRSE A PARTIDA"}
          </Button>
        </form>
      </main>
    </div>
  );
}
