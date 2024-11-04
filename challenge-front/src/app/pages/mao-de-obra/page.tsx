"use client";
import type { MaoDeObra } from "@/types";
import { useEffect, useState } from "react";

export default function MaoDeObraComponent() {
    const [maoDeObra, setMaoDeObra] = useState<MaoDeObra[]>([]);
    const [isEditing, setIsEditing] = useState<number | null>(null);
    const [newMaoDeObra, setNewMaoDeObra] = useState<MaoDeObra>({
        codigo: 0,
        descricaoMaoDeObra: "",
        valorHora: 0,
    });

    useEffect(() => {
        const chamadaApiJava = async () => {
            try {
                const response = await fetch("http://localhost:8080/consultar/maoDeObra");
                const data = await response.json();
                setMaoDeObra(data);
            } catch (error) {
                console.error("Erro ao buscar mão de obra:", error);
            }
        };

        chamadaApiJava();
    }, []);

    const handleAdd = async () => {
        try {
            const response = await fetch("http://localhost:8080/consultar/maoDeObra", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newMaoDeObra),
            });
            if (response.ok) {
                const maoDeObraAdicionada = await response.json();
                setMaoDeObra(prevMaoDeObra => [...prevMaoDeObra, maoDeObraAdicionada]);
                setNewMaoDeObra({ codigo: 0, descricaoMaoDeObra: "", valorHora: 0 });
                window.location.reload();
            } else {
                console.error("Erro ao adicionar mão de obra");
            }
        } catch (error) {
            console.error("Erro ao adicionar mão de obra:", error);
        }
    };

    const handleEdit = (codigo: number) => {
        setIsEditing(codigo);
    };

    const handleSave = async (codigo: number) => {
        const maoDeObraEditada = maoDeObra.find(m => m.codigo === codigo);
        if (!maoDeObraEditada) return;

        try {
            const response = await fetch(`http://localhost:8080/consultar/maoDeObra/${codigo}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(maoDeObraEditada),
            });
            if (response.ok) {
                setIsEditing(null);
            } else {
                console.error("Erro ao editar mão de obra");
            }
        } catch (error) {
            console.error("Erro ao editar mão de obra:", error);
        }
    };

    const handleDelete = async (codigo: number) => {
        try {
            const response = await fetch(`http://localhost:8080/consultar/maoDeObra/${codigo}`, {
                method: "DELETE",
            });
            if (response.ok) {
                setMaoDeObra(prevMaoDeObra => prevMaoDeObra.filter(m => m.codigo !== codigo));
                if (isEditing === codigo) {
                    setIsEditing(null);
                }
            } else {
                console.error("Erro ao excluir mão de obra");
            }
        } catch (error) {
            console.error("Erro ao excluir mão de obra:", error);
        }
    };

    return (
        <div className="clientes-container">
            <h1 className="clientes-title">Mão de Obra</h1>
            <table className="clientes-table">
                <thead>
                    <tr className="clientes-header">
                        <th className="clientes-header-cell">Código</th>
                        <th className="clientes-header-cell">Descrição</th>
                        <th className="clientes-header-cell">Valor por Hora</th>
                        <th className="clientes-header-cell">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {maoDeObra.map(m => (
                        <tr key={m.codigo} className="clientes-row">
                            <td className="clientes-cell">{m.codigo}</td>
                            <td className="clientes-cell">
                                {isEditing === m.codigo ? (
                                    <input
                                        type="text"
                                        value={m.descricaoMaoDeObra}
                                        onChange={e =>
                                            setMaoDeObra(
                                                maoDeObra.map(ma =>
                                                    ma.codigo === m.codigo
                                                        ? { ...ma, descricaoMaoDeObra: e.target.value }
                                                        : ma
                                                )
                                            )
                                        }
                                        className="clientes-input"
                                    />
                                ) : (
                                    m.descricaoMaoDeObra
                                )}
                            </td>
                            <td className="clientes-cell">
                                {isEditing === m.codigo ? (
                                    <input
                                        type="number"
                                        value={m.valorHora}
                                        onChange={e =>
                                            setMaoDeObra(
                                                maoDeObra.map(ma =>
                                                    ma.codigo === m.codigo
                                                        ? { ...ma, valorHora: parseFloat(e.target.value) }
                                                        : ma
                                                )
                                            )
                                        }
                                        className="clientes-input"
                                    />
                                ) : (
                                    m.valorHora
                                )}
                            </td>
                            <td className="clientes-cell">
                                {isEditing === m.codigo ? (
                                    <button onClick={() => handleSave(m.codigo)} className="clientes-button-save">
                                        Salvar
                                    </button>
                                ) : (
                                    <button onClick={() => handleEdit(m.codigo)} className="clientes-button-edit">
                                        Editar
                                    </button>
                                )}
                                <button onClick={() => handleDelete(m.codigo)} className="clientes-button-delete">
                                    Excluir
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2 className="clientes-add-title">Adicionar Nova Mão de Obra</h2>
            <div className="clientes-add-form">
                <input
                    type="text"
                    placeholder="Descrição"
                    value={newMaoDeObra.descricaoMaoDeObra}
                    onChange={e => setNewMaoDeObra({ ...newMaoDeObra, descricaoMaoDeObra: e.target.value })}
                    className="clientes-input"
                />
                <input
                    type="number"
                    placeholder="Valor por Hora"
                    value={newMaoDeObra.valorHora}
                    onChange={e => setNewMaoDeObra({ ...newMaoDeObra, valorHora: parseFloat(e.target.value) })}
                    className="clientes-input"
                />
                <button onClick={handleAdd} className="clientes-button-add">
                    Adicionar
                </button>
            </div>
        </div>
    );
}
