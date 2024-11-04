"use client";
import type { Especialidade } from "@/types";
import { useEffect, useState } from "react";

export default function Especialidade() {
    const [especialidades, setEspecialidades] = useState<Especialidade[]>([]);
    const [isEditing, setIsEditing] = useState<number | null>(null);
    const [newEspecialidade, setNewEspecialidade] = useState<Especialidade>({
        codigo: 0,
        descricaoDaEspecialidade: "",
    });

    useEffect(() => {
        const fetchEspecialidades = async () => {
            try {
                const response = await fetch("http://localhost:8080/consultar/especialidade");
                const data = await response.json();
                setEspecialidades(data);
            } catch (error) {
                console.error("Erro ao buscar especialidades:", error);
            }
        };

        fetchEspecialidades();
    }, []);

    const handleAdd = async () => {
        try {
            const response = await fetch("http://localhost:8080/consultar/especialidade", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newEspecialidade),
            });
            if (response.ok) {
                const especialidadeAdicionada = await response.json();
                setEspecialidades(prevEspecialidades => [...prevEspecialidades, especialidadeAdicionada]);
                setNewEspecialidade({ codigo: 0, descricaoDaEspecialidade: "" });
                window.location.reload();
            } else {
                console.error("Erro ao adicionar especialidade");
            }
        } catch (error) {
            console.error("Erro ao adicionar especialidade:", error);
        }
    };

    const handleEdit = (codigo: number) => {
        setIsEditing(codigo);
    };

    const handleSave = async (codigo: number) => {
        const especialidadeEditada = especialidades.find(especialidade => especialidade.codigo === codigo);
        if (!especialidadeEditada) return;

        try {
            const response = await fetch(`http://localhost:8080/consultar/especialidade/${codigo}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(especialidadeEditada),
            });
            if (response.ok) {
                setIsEditing(null);
            } else {
                console.error("Erro ao editar especialidade");
            }
        } catch (error) {
            console.error("Erro ao editar especialidade:", error);
        }
    };

    const handleDelete = async (codigo: number) => {
        try {
            const response = await fetch(`http://localhost:8080/consultar/especialidade/${codigo}`, {
                method: "DELETE",
            });
            if (response.ok) {
                setEspecialidades(prevEspecialidades => prevEspecialidades.filter(especialidade => especialidade.codigo !== codigo));
                if (isEditing === codigo) {
                    setIsEditing(null);
                }
            } else {
                console.error(`Erro ao excluir especialidade: ${response.status} - ${response.statusText}`);
            }
        } catch (error) {
            console.error("Erro ao excluir especialidade:", error);
        }
    };

    return (
        <div className="clientes-container">
            <h1 className="clientes-title">Especialidades</h1>
            <table className="clientes-table">
                <thead>
                    <tr className="clientes-header">
                        <th className="clientes-header-cell">Código</th>
                        <th className="clientes-header-cell">Descrição da Especialidade</th>
                        <th className="clientes-header-cell">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {especialidades.map(especialidade => (
                        <tr key={especialidade.codigo} className="clientes-row">
                            <td className="clientes-cell">{especialidade.codigo}</td>
                            <td className="clientes-cell">
                                {isEditing === especialidade.codigo ? (
                                    <input
                                        type="text"
                                        value={especialidade.descricaoDaEspecialidade}
                                        onChange={e =>
                                            setEspecialidades(
                                                especialidades.map(eItem =>
                                                    eItem.codigo === especialidade.codigo
                                                        ? { ...eItem, descricaoDaEspecialidade: e.target.value }
                                                        : eItem
                                                )
                                            )
                                        }
                                        className="clientes-input"
                                    />
                                ) : (
                                    especialidade.descricaoDaEspecialidade
                                )}
                            </td>
                            <td className="clientes-cell">
                                {isEditing === especialidade.codigo ? (
                                    <button onClick={() => handleSave(especialidade.codigo)} className="clientes-button-save">
                                        Salvar
                                    </button>
                                ) : (
                                    <button onClick={() => handleEdit(especialidade.codigo)} className="clientes-button-edit">
                                        Editar
                                    </button>
                                )}
                                <button onClick={() => handleDelete(especialidade.codigo)} className="clientes-button-delete">
                                    Excluir
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2 className="clientes-add-title">Adicionar Nova Especialidade</h2>
            <div className="clientes-add-form">
                <input
                    type="text"
                    placeholder="Descrição da Especialidade"
                    value={newEspecialidade.descricaoDaEspecialidade}
                    onChange={e => setNewEspecialidade({ ...newEspecialidade, descricaoDaEspecialidade: e.target.value })}
                    className="clientes-input"
                />
                <button onClick={handleAdd} className="clientes-button-add">
                    Adicionar
                </button>
            </div>
        </div>
    );
}
