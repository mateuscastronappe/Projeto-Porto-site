"use client";
import type { Sinistro } from "@/types";
import { useEffect, useState } from "react";

export default function Sinistro() {
    const [sinistros, setSinistros] = useState<Sinistro[]>([]);
    const [isEditing, setIsEditing] = useState<number | null>(null);
    const [newSinistro, setNewSinistro] = useState<Sinistro>({
        codigo: 0,
        descricaoDoSinistro: "",
        valorDoSinistro: 0,
        dataDoSinistro: "",
    });

    useEffect(() => {
        const fetchSinistros = async () => {
            try {
                const response = await fetch("http://localhost:8080/consultar/sinistro");
                const data = await response.json();
                setSinistros(data);
            } catch (error) {
                console.error("Erro ao buscar sinistros:", error);
            }
        };

        fetchSinistros();
    }, []);

    const handleAdd = async () => {
        try {
            const response = await fetch("http://localhost:8080/consultar/sinistro", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newSinistro),
            });
            if (response.ok) {
                const sinistroAdicionado = await response.json();
                setSinistros(prevSinistros => [...prevSinistros, sinistroAdicionado]);
                setNewSinistro({ codigo: 0, descricaoDoSinistro: "", valorDoSinistro: 0, dataDoSinistro: "" });
                window.location.reload();
            } else {
                console.error("Erro ao adicionar sinistro");
            }
        } catch (error) {
            console.error("Erro ao adicionar sinistro:", error);
        }
    };

    const handleEdit = (codigo: number) => {
        setIsEditing(codigo);
    };

    const handleSave = async (codigo: number) => {
        const sinistroEditado = sinistros.find(sinistro => sinistro.codigo === codigo);
        if (!sinistroEditado) return;

        try {
            const response = await fetch(`http://localhost:8080/consultar/sinistro/${codigo}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(sinistroEditado),
            });
            if (response.ok) {
                setIsEditing(null);
            } else {
                console.error("Erro ao editar sinistro");
            }
        } catch (error) {
            console.error("Erro ao editar sinistro:", error);
        }
    };

    const handleDelete = async (codigo: number) => {
        try {
            const response = await fetch(`http://localhost:8080/consultar/sinistro/${codigo}`, {
                method: "DELETE",
            });
            if (response.ok) {
                setSinistros(prevSinistros => prevSinistros.filter(sinistro => sinistro.codigo !== codigo));
                if (isEditing === codigo) {
                    setIsEditing(null);
                }
            } else {
                console.error("Erro ao excluir sinistro");
            }
        } catch (error) {
            console.error("Erro ao excluir sinistro:", error);
        }
    };

    return (
        <div className="clientes-container">
            <h1 className="clientes-title">Sinistros</h1>
            <table className="clientes-table">
                <thead>
                    <tr className="clientes-header">
                        <th className="clientes-header-cell">Código</th>
                        <th className="clientes-header-cell">Descrição do Sinistro</th>
                        <th className="clientes-header-cell">Valor do Sinistro</th>
                        <th className="clientes-header-cell">Data do Sinistro</th>
                        <th className="clientes-header-cell">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {sinistros.map(sinistro => (
                        <tr key={sinistro.codigo} className="clientes-row">
                            <td className="clientes-cell">{sinistro.codigo}</td>
                            <td className="clientes-cell">
                                {isEditing === sinistro.codigo ? (
                                    <input
                                        type="text"
                                        value={sinistro.descricaoDoSinistro}
                                        onChange={e =>
                                            setSinistros(
                                                sinistros.map(s =>
                                                    s.codigo === sinistro.codigo
                                                        ? { ...s, descricaoDoSinistro: e.target.value }
                                                        : s
                                                )
                                            )
                                        }
                                        className="clientes-input"
                                    />
                                ) : (
                                    sinistro.descricaoDoSinistro
                                )}
                            </td>
                            <td className="clientes-cell">
                                {isEditing === sinistro.codigo ? (
                                    <input
                                        type="number"
                                        value={sinistro.valorDoSinistro}
                                        onChange={e =>
                                            setSinistros(
                                                sinistros.map(s =>
                                                    s.codigo === sinistro.codigo
                                                        ? { ...s, valorDoSinistro: parseFloat(e.target.value) }
                                                        : s
                                                )
                                            )
                                        }
                                        className="clientes-input"
                                    />
                                ) : (
                                    sinistro.valorDoSinistro
                                )}
                            </td>
                            <td className="clientes-cell">
                                {isEditing === sinistro.codigo ? (
                                    <input
                                        type="date"
                                        value={sinistro.dataDoSinistro}
                                        onChange={e =>
                                            setSinistros(
                                                sinistros.map(s =>
                                                    s.codigo === sinistro.codigo
                                                        ? { ...s, dataDoSinistro: e.target.value }
                                                        : s
                                                )
                                            )
                                        }
                                        className="clientes-input"
                                    />
                                ) : (
                                    sinistro.dataDoSinistro
                                )}
                            </td>
                            <td className="clientes-cell">
                                {isEditing === sinistro.codigo ? (
                                    <button onClick={() => handleSave(sinistro.codigo)} className="clientes-button-save">
                                        Salvar
                                    </button>
                                ) : (
                                    <button onClick={() => handleEdit(sinistro.codigo)} className="clientes-button-edit">
                                        Editar
                                    </button>
                                )}
                                <button onClick={() => handleDelete(sinistro.codigo)} className="clientes-button-delete">
                                    Excluir
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2 className="clientes-add-title">Adicionar Novo Sinistro</h2>
            <div className="clientes-add-form">
                <input
                    type="text"
                    placeholder="Descrição do Sinistro"
                    value={newSinistro.descricaoDoSinistro}
                    onChange={e => setNewSinistro({ ...newSinistro, descricaoDoSinistro: e.target.value })}
                    className="clientes-input"
                />
                <input
                    type="number"
                    placeholder="Valor do Sinistro"
                    value={newSinistro.valorDoSinistro}
                    onChange={e => setNewSinistro({ ...newSinistro, valorDoSinistro: parseFloat(e.target.value) })}
                    className="clientes-input"
                />
                <input
                    type="date"
                    placeholder="Data do Sinistro"
                    value={newSinistro.dataDoSinistro}
                    onChange={e => setNewSinistro({ ...newSinistro, dataDoSinistro: e.target.value })}
                    className="clientes-input"
                />
                <button onClick={handleAdd} className="clientes-button-add">
                    Adicionar
                </button>
            </div>
        </div>
    );
}
