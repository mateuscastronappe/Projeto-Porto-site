"use client";
import type { Oficina } from "@/types";
import { useEffect, useState } from "react";

export default function Oficina() {
    const [oficinas, setOficinas] = useState<Oficina[]>([]);
    const [isEditing, setIsEditing] = useState<number | null>(null);
    const [newOficina, setNewOficina] = useState<Oficina>({
        codigo: 0,
        nomeDaOficina: "",
        enderecoDaOficina: "",
    });

    useEffect(() => {
        const chamadaApiJava = async () => {
            try {
                const response = await fetch("http://localhost:8080/consultar/oficina");
                const data = await response.json();
                setOficinas(data);
            } catch (error) {
                console.error("Erro ao buscar oficinas:", error);
            }
        };

        chamadaApiJava();
    }, []);

    const handleAdd = async () => {
        try {
            const response = await fetch("http://localhost:8080/consultar/oficina", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newOficina),
            });
            if (response.ok) {
                const oficinaAdicionada = await response.json();
                console.log("Oficina adicionada:", oficinaAdicionada);
                setOficinas(prevOficinas => [...prevOficinas, oficinaAdicionada]);
                setNewOficina({ codigo: 0, nomeDaOficina: "", enderecoDaOficina: "" });
                window.location.reload();
            } else {
                console.error("Erro ao adicionar oficina");
            }
        } catch (error) {
            console.error("Erro ao adicionar oficina:", error);
        }
    };

    const handleEdit = (codigo: number) => {
        setIsEditing(codigo);
    };

    const handleSave = async (codigo: number) => {
        const oficinaEditada = oficinas.find(oficinas => oficinas.codigo === codigo);
        if (!oficinaEditada) return;

        try {
            const response = await fetch(`http://localhost:8080/consultar/oficina/${codigo}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(oficinaEditada),
            });
            if (response.ok) {
                setIsEditing(null);
            } else {
                console.error("Erro ao editar oficina");
            }
        } catch (error) {
            console.error("Erro ao editar oficina:", error);
        }
    };



    const handleDelete = async (codigo: number) => {
        console.log("Tentando excluir oficina com código:", codigo);
        try {
            const response = await fetch(`http://localhost:8080/consultar/oficina/${codigo}`, {
                method: "DELETE",
            });
            console.log(`Resposta da API ao excluir oficina ${codigo}:`, response);
            if (response.ok) {
                setOficinas(prevOficinas => prevOficinas.filter(oficina => oficina.codigo !== codigo));
                if (isEditing === codigo) {
                    setIsEditing(null);
                }
            } else {
                console.error(`Erro ao excluir oficina: ${response.status} - ${response.statusText}`);
            }
        } catch (error) {
            console.error("Erro ao excluir oficina:", error);
        }
    };

    return (
        <div className="clientes-container">
            <h1 className="clientes-title">Oficinas</h1>
            <table className="clientes-table">
                <thead>
                    <tr className="clientes-header">
                        <th className="clientes-header-cell">Código</th>
                        <th className="clientes-header-cell">Nome da Oficina</th>
                        <th className="clientes-header-cell">Endereço da Oficina</th>
                        <th className="clientes-header-cell">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {oficinas.map(oficina => (
                        <tr key={oficina.codigo} className="clientes-row">
                            <td className="clientes-cell">{oficina.codigo}</td>
                            <td className="clientes-cell">
                                {isEditing === oficina.codigo ? (
                                    <input
                                        type="text"
                                        value={oficina.nomeDaOficina}
                                        onChange={e =>
                                            setOficinas(
                                                oficinas.map(o =>
                                                    o.codigo === oficina.codigo
                                                        ? { ...o, nomeDaOficina: e.target.value }
                                                        : o
                                                )
                                            )
                                        }
                                        className="clientes-input"
                                    />
                                ) : (
                                    oficina.nomeDaOficina
                                )}
                            </ td>
                            <td className="clientes-cell">
                                {isEditing === oficina.codigo ? (
                                    <input
                                        type="text"
                                        value={oficina.enderecoDaOficina}
                                        onChange={e =>
                                            setOficinas(
                                                oficinas.map(o =>
                                                    o.codigo === oficina.codigo
                                                        ? { ...o, enderecoDaOficina: e.target.value }
                                                        : o
                                                )
                                            )
                                        }
                                        className="clientes-input"
                                    />
                                ) : (
                                    oficina.enderecoDaOficina
                                )}
                            </td>
                            <td className="clientes-cell">
                                {isEditing === oficina.codigo ? (
                                    <button onClick={() => handleSave(oficina.codigo)} className="clientes-button-save">
                                        Salvar
                                    </button>
                                ) : (
                                    <button onClick={() => handleEdit(oficina.codigo)} className="clientes-button-edit">
                                        Editar
                                    </button>
                                )}
                                <button onClick={() => handleDelete(oficina.codigo)} className="clientes-button-delete">
                                    Excluir
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2 className="clientes-add-title">Adicionar Nova Oficina</h2>
            <div className="clientes-add-form">
                <input
                    type="text"
                    placeholder="Nome da Oficina"
                    value={newOficina.nomeDaOficina}
                    onChange={e => setNewOficina({ ...newOficina, nomeDaOficina: e.target.value })}
                    className="clientes-input"
                />
                <input
                    type="text"
                    placeholder="Endereço da Oficina"
                    value={newOficina.enderecoDaOficina}
                    onChange={e => setNewOficina({ ...newOficina, enderecoDaOficina: e.target.value })}
                    className="clientes-input"
                />
                <button onClick={handleAdd} className="clientes-button-add">
                    Adicionar
                </button>
            </div>
        </div>
    );
}