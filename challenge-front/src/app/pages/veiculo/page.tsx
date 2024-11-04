"use client";
import type { Veiculo } from "@/types"; 
import { useEffect, useState } from "react";

export default function Veiculo() {
    const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
    const [isEditing, setIsEditing] = useState<number | null>(null);
    const [newVeiculo, setNewVeiculo] = useState<Veiculo>({
        codigo: 0,
        placa: "",
        modelo: "",
        cor: "",
        dataDeFabricacao: "",
    });

    useEffect(() => {
        const chamadaApiJava = async () => {
            try {
                const response = await fetch("http://localhost:8080/consultar/veiculo");
                const data = await response.json();
                setVeiculos(data);
            } catch (error) {
                console.error("Erro ao buscar veículos:", error);
            }
        };

        chamadaApiJava();
    }, []);

    const handleAdd = async () => {
        try {
            const response = await fetch("http://localhost:8080/consultar/veiculo", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newVeiculo),
            });
            if (response.ok) {
                const veiculoAdicionado = await response.json();
                console.log("Veículo adicionado:", veiculoAdicionado);
                setVeiculos(prevVeiculos => [...prevVeiculos, veiculoAdicionado]);
                setNewVeiculo({ codigo: 0, placa: "", modelo: "", cor: "", dataDeFabricacao: "" });
                window.location.reload();
            } else {
                console.error("Erro ao adicionar veículo");
            }
        } catch (error) {
            console.error("Erro ao adicionar veículo:", error);
        }
    };

    const handleEdit = (codigo: number) => {
        setIsEditing(codigo);
    };

    const handleSave = async (codigo: number) => {
        const veiculoEditado = veiculos.find(veiculo => veiculo.codigo === codigo);
        if (!veiculoEditado) return;

        try {
            const response = await fetch(`http://localhost:8080/consultar/veiculo/${codigo}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(veiculoEditado),
            });
            if (response.ok) {
                setIsEditing(null);
            } else {
                console.error("Erro ao editar veículo");
            }
        } catch (error) {
            console.error("Erro ao editar veículo:", error);
        }
    };

    const handleDelete = async (codigo: number) => {
        console.log("Tentando excluir veículo com código:", codigo);
        try {
            const response = await fetch(`http://localhost:8080/consultar/veiculo/${codigo}`, {
                method: "DELETE",
            });
            console.log(`Resposta da API ao excluir veículo ${codigo}:`, response);
            if (response.ok) {
                setVeiculos(prevVeiculos => prevVeiculos.filter(veiculo => veiculo.codigo !== codigo));
                if (isEditing === codigo) {
                    setIsEditing(null);
                }
            } else {
                console.error(`Erro ao excluir veículo: ${response.status} - ${response.statusText}`);
            }
        } catch (error) {
            console.error("Erro ao excluir veículo:", error);
        }
    };

    return (
        <div className="clientes-container">
            <h1 className="clientes-title">Veículos</h1>
            <table className="clientes-table">
                <thead>
                    <tr className="clientes-header">
                        <th className="clientes-header-cell">Código</th>
                        <th className="clientes-header-cell">Placa</th>
                        <th className="clientes-header-cell">Modelo</th>
                        <th className="clientes-header-cell">Cor</th>
                        <th className="clientes-header-cell">Data de Fabricação</th>
                        <th className="clientes-header-cell">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {veiculos.map(veiculo => (
                        <tr key={veiculo.codigo} className="clientes-row">
                            <td className="clientes-cell">{veiculo.codigo}</td>
                            <td className="clientes-cell">
                                {isEditing === veiculo.codigo ? (
                                    <input
                                        type="text"
                                        value={veiculo.placa}
                                        onChange={e =>
                                            setVeiculos(
                                                veiculos.map(v =>
                                                    v.codigo === veiculo .codigo
                                                        ? { ...v, placa: e.target.value }
                                                        : v
                                                )
                                            )
                                        }
                                        className="clientes-input"
                                    />
                                ) : (
                                    veiculo.placa
                                )}
                            </td>
                            <td className="clientes-cell">
                                {isEditing === veiculo.codigo ? (
                                    <input
                                        type="text"
                                        value={veiculo.modelo}
                                        onChange={e =>
                                            setVeiculos(
                                                veiculos.map(v =>
                                                    v.codigo === veiculo.codigo
                                                        ? { ...v, modelo: e.target.value }
                                                        : v
                                                )
                                            )
                                        }
                                        className="clientes-input"
                                    />
                                ) : (
                                    veiculo.modelo
                                )}
                            </td>
                            <td className="clientes-cell">
                                {isEditing === veiculo.codigo ? (
                                    <input
                                        type="text"
                                        value={veiculo.cor}
                                        onChange={e =>
                                            setVeiculos(
                                                veiculos.map(v =>
                                                    v.codigo === veiculo.codigo
                                                        ? { ...v, cor: e.target.value }
                                                        : v
                                                )
                                            )
                                        }
                                        className="clientes-input"
                                    />
                                ) : (
                                    veiculo.cor
                                )}
                            </td>
                            <td className="clientes-cell">
                                {isEditing === veiculo.codigo ? (
                                    <input
                                        type="date"
                                        value={veiculo.dataDeFabricacao}
                                        onChange={e =>
                                            setVeiculos(
                                                veiculos.map(v =>
                                                    v.codigo === veiculo.codigo
                                                        ? { ...v, dataDeFabricacao: e.target.value }
                                                        : v
                                                )
                                            )
                                        }
                                        className="clientes-input"
                                    />
                                ) : (
                                    veiculo.dataDeFabricacao
                                )}
                            </td>
                            <td className="clientes-cell">
                                {isEditing === veiculo.codigo ? (
                                    <button onClick={() => handleSave(veiculo.codigo)} className="clientes-button-save">
                                        Salvar
                                    </button>
                                ) : (
                                    <button onClick={() => handleEdit(veiculo.codigo)} className="clientes-button-edit">
                                        Editar
                                    </button>
                                )}
                                <button onClick={() => handleDelete(veiculo.codigo)} className="clientes-button-delete">
                                    Excluir
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2 className="clientes-add-title">Adicionar Novo Veículo</h2>
            <div className="clientes-add-form">
                <input
                    type="text"
                    placeholder="Placa"
                    value={newVeiculo.placa}
                    onChange={e => setNewVeiculo({ ...newVeiculo, placa: e.target.value })}
                    className="clientes-input"
                />
                <input
                    type="text"
                    placeholder="Modelo"
                    value={newVeiculo.modelo}
                    onChange={e => setNewVeiculo({ ...newVeiculo, modelo: e.target.value })}
                    className="clientes-input"
                />
                <input
                    type="text"
                    placeholder="Cor"
                    value={newVeiculo.cor}
                    onChange={e => setNewVeiculo({ ...newVeiculo, cor: e.target.value })}
                    className="clientes-input"
                />
                <input
                    type="date"
                    placeholder="Data de Fabricação"
                    value={newVeiculo.dataDeFabricacao}
                    onChange={e => setNewVeiculo({ ...newVeiculo, dataDeFabricacao: e.target.value })}
                    className="clientes-input"
                />
                <button onClick={handleAdd} className="clientes-button-add">
                    Adicionar
                </button>
            </div>
        </div>
    );
}