"use client";
import type { Apolice } from "@/types";
import { useEffect, useState } from "react";

export default function Apolice() {
    const [apolices, setApolices] = useState<Apolice[]>([]);
    const [isEditing, setIsEditing] = useState<number | null>(null);
    const [newApolice, setNewApolice] = useState<Apolice>({
        codigo: 0,
        tipoDeCobertura: "",
        valorSegurado: 0,
        dataEmissao: "",
    });

    useEffect(() => {
        const fetchApolices = async () => {
            try {
                const response = await fetch("http://localhost:8080/consultar/apolice");
                const data = await response.json();
                setApolices(data);
            } catch (error) {
                console.error("Erro ao buscar apólices:", error);
            }
        };

        fetchApolices();
    }, []);

    const handleAdd = async () => {
        try {
            const response = await fetch("http://localhost:8080/consultar/apolice", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newApolice),
            });
            if (response.ok) {
                const apoliceAdicionada = await response.json();
                setApolices(prevApolices => [...prevApolices, apoliceAdicionada]);
                setNewApolice({ codigo: 0, tipoDeCobertura: "", valorSegurado: 0, dataEmissao: "" });
                window.location.reload();
            } else {
                console.error("Erro ao adicionar apólice");
            }
        } catch (error) {
            console.error("Erro ao adicionar apólice:", error);
        }
    };

    const handleEdit = (codigo: number) => {
        setIsEditing(codigo);
    };

    const handleSave = async (codigo: number) => {
        const apoliceEditada = apolices.find(apolice => apolice.codigo === codigo);
        if (!apoliceEditada) return;

        try {
            const response = await fetch(`http://localhost:8080/consultar/apolice/${codigo}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(apoliceEditada),
            });
            if (response.ok) {
                setIsEditing(null);
            } else {
                console.error("Erro ao editar apólice");
            }
        } catch (error) {
            console.error("Erro ao editar apólice:", error);
        }
    };

    const handleDelete = async (codigo: number) => {
        try {
            const response = await fetch(`http://localhost:8080/consultar/apolice/${codigo}`, {
                method: "DELETE",
            });
            if (response.ok) {
                setApolices(prevApolices => prevApolices.filter(apolice => apolice.codigo !== codigo));
                if (isEditing === codigo) {
                    setIsEditing(null);
                }
            } else {
                console.error("Erro ao excluir apólice");
            }
        } catch (error) {
            console.error("Erro ao excluir apólice:", error);
        }
    };

    return (
        <div className="clientes-container">
            <h1 className="clientes-title">Apólices</h1>
            <table className="clientes-table">
                <thead>
                    <tr className="clientes-header">
                        <th className="clientes-header-cell">Código</th>
                        <th className="clientes-header-cell">Tipo de Cobertura</th>
                        <th className="clientes-header-cell">Valor Segurado</th>
                        <th className="clientes-header-cell">Data de Emissão</th>
                        <th className="clientes-header-cell">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {apolices.map(apolice => (
                        <tr key={apolice.codigo} className="clientes-row">
                            <td className="clientes-cell">{apolice.codigo}</td>
                            <td className="clientes-cell">
                                {isEditing === apolice.codigo ? (
                                    <input
                                        type="text"
                                        value={apolice.tipoDeCobertura}
                                        onChange={e =>
                                            setApolices(
                                                apolices.map(a =>
                                                    a.codigo === apolice.codigo
                                                        ? { ...a, tipoDeCobertura: e.target.value }
                                                        : a
                                                )
                                            )
                                        }
                                        className="clientes-input"
                                    />
                                ) : (
                                    apolice.tipoDeCobertura
                                )}
                            </td>
                            <td className="clientes-cell">
                                {isEditing === apolice.codigo ? (
                                    <input
                                        type="number"
                                        value={apolice.valorSegurado}
                                        onChange={e =>
                                            setApolices(
                                                apolices.map(a =>
                                                    a.codigo === apolice.codigo
                                                        ? { ...a, valorSegurado: parseFloat(e.target.value) }
                                                        : a
                                                )
                                            )
                                        }
                                        className="clientes-input"
                                    />
                                ) : (
                                    apolice.valorSegurado
                                )}
                            </td>
                            <td className="clientes-cell">
                                {isEditing === apolice.codigo ? (
                                    <input
                                        type="date"
                                        value={apolice.dataEmissao}
                                        onChange={e =>
                                            setApolices(
                                                apolices.map(a =>
                                                    a.codigo === apolice.codigo
                                                        ? { ...a, dataEmissao: e.target.value }
                                                        : a
                                                )
                                            )
                                        }
                                        className="clientes-input"
                                    />
                                ) : (
                                    apolice.dataEmissao
                                )}
                            </td>
                            <td className="clientes-cell">
                                {isEditing === apolice.codigo ? (
                                    <button onClick={() => handleSave(apolice.codigo)} className="clientes-button-save">
                                        Salvar
                                    </button>
                                ) : (
                                    <button onClick={() => handleEdit(apolice.codigo)} className="clientes-button-edit">
                                        Editar
                                    </button>
                                )}
                                <button onClick={() => handleDelete(apolice.codigo)} className="clientes-button-delete">
                                    Excluir
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2 className="clientes-add-title">Adicionar Nova Apólice</h2>
            <div className="clientes-add-form">
                <input
                    type="text"
                    placeholder="Tipo de Cobertura"
                    value={newApolice.tipoDeCobertura}
                    onChange={e => setNewApolice({ ...newApolice, tipoDeCobertura: e.target.value })}
                    className="clientes-input"
                />
                <input
                    type="number"
                    placeholder="Valor Segurado"
                    value={newApolice.valorSegurado}
                    onChange={e => setNewApolice({ ...newApolice, valorSegurado: parseFloat(e.target.value) })}
                    className="clientes-input"
                />
                <input
                    type="date"
                    placeholder="Data de Emissão"
                    value={newApolice.dataEmissao}
                    onChange={e => setNewApolice({ ...newApolice, dataEmissao: e.target.value })}
                    className="clientes-input"
                />
                <button onClick={handleAdd} className="clientes-button-add">
                    Adicionar
                </button>
            </div>
        </div>
    );
}
