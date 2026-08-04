import { useEffect, useMemo, useState } from "react";

import type { Task } from "../types/Task";
import {
  addTask,
  getTasksByUser,
  getOrderByCreatedAt,
  deleteTask,
} from "../services/taskService";

type Props = {
  uid: string | null; // viene de tu Auth layer
};

export function TasksPage({ uid }: Props) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // let total = useMemo(() => {
  //   // como se debe calcular
  //   const peticon = fetch()
  //   return peticon
  // },[uid])

  // cuando calcular un dato es muy costoso (procesa muchos datos) usa useMemo el cual guardara la informacion
  // y no se recalculara sin importar si cambia un estado y no se usa ese dato
  const canSubmit = useMemo(() => {
    return Boolean(uid) && title.trim().length > 0 && !loading;
  }, [uid, title, loading]);

  // useCallback=> sirve para guardar funciones y no vuelvan a procesarse
  // las dependencias son las que hacen que la funcion se vuelva a crear
  // const canSubmitMemo = useCallback(() => {
  //   return Boolean(uid) && title.trim().length > 0 && !loading;
  // }, [uid, title, loading]);

  //useRef => es una caja que puede guardar cualquier valor y no pierde su valor entre re-renderizados
  //es como una variable que no causa re-renderizados cuando cambia
  // const countRef = useRef(0);

  useEffect(() => {
    if (!uid) {
      setTasks([]);
      return;
    }

    let cancelled = false;

    // funciones anonimas autoejecutables
    (async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getTasksByUser(uid);

        if (!cancelled) setTasks(data);
      } catch (e) {
        // En un producto real, acá loguearías e, o lo mapearías.
        if (!cancelled) setError("No se pudieron cargar las tareas.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [uid]);

  async function handleAddTask(e: React.FormEvent) {
    e.preventDefault();

    if (!uid) {
      setError("Necesitás iniciar sesión para crear tareas.");
      return;
    }

    const cleanTitle = title.trim();
    if (!cleanTitle) return;

    try {
      setLoading(true);
      setError(null);

      const created = await addTask({ title: cleanTitle, userId: uid });

      // UX: limpiar input inmediatamente
      setTitle("");

      // UX: actualizar lista local sin esperar otro fetch
      // (en este hands-on lo hacemos simple: prepend)
      setTasks((prev) => [created, ...prev]);
    } catch (e: unknown) {
      // Debug de error típico
      const message = e instanceof Error ? e.message : "Unknown error";

      if (
        message.toLowerCase().includes("permission") ||
        message.toLowerCase().includes("insufficient")
      ) {
        setError(
          "Permisos insuficientes (permission-denied). Revisá Firestore Rules y asegurate de estar filtrando por userId en la query.",
        );
        return;
      }

      setError("No se pudo crear la tarea.");
    } finally {
      setLoading(false);
    }
  }

  async function getByOrder() {
    try {
      setLoading(true);
      setError(null);
      setTasks([]);

      if (!uid) {
        setError("Necesitás iniciar sesión para ver tus tareas.");
        return;
      }

      const response = await getOrderByCreatedAt(uid);

      setTasks(response);
    } catch (error) {
      console.log("error", error);

      setError("No se pudieron cargar las tareas.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteTask(taskId: string): Promise<void> {
    try {
      setLoading(true);
      setError(null);
      await deleteTask(taskId);

      setTasks((currentTasks) =>
        currentTasks.filter((task) => task.id !== taskId),
      );
    } catch (error) {
      console.error("No se pudo eliminar la tarea", error);
      setError("No se pudo eliminar la tarea.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ padding: 16 }}>
      <h1>Mis tareas</h1>

      {!uid && (
        <p>
          Iniciá sesión para ver tus tareas. (En un producto real, esto sería
          una ruta protegida.)
        </p>
      )}

      <form
        onSubmit={handleAddTask}
        style={{ display: "flex", gap: 8, marginTop: 12 }}
      >
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Nueva tarea..."
          aria-label="Nueva tarea"
        />
        <button type="submit" disabled={!canSubmit}>
          {loading ? "Guardando..." : "Agregar"}
        </button>
      </form>

      <section>
        <button onClick={getByOrder}> Mostrar lista ordenada</button>
      </section>

      {error && (
        <p role="alert" style={{ color: "crimson", marginTop: 12 }}>
          {error}
        </p>
      )}

      {loading && tasks.length === 0 && <p>Cargando tareas...</p>}

      {!loading && !error && tasks.length === 0 && uid && (
        <p>No tenés tareas todavía.</p>
      )}

      <ul style={{ marginTop: 16 }}>
        {tasks.map((t) => (
          <li key={t.id}>
            {t.title}{" "}
            <small style={{ opacity: 0.7 }}>(owner: {t.userId})</small>
            <button onClick={() => handleDeleteTask(t.id)}> delete </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
