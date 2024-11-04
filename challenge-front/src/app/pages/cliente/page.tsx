"use client";
import type { Cliente } from "@/types";
import { useEffect, useState } from "react";

export default function ClienteComponent() {
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [isEditing, setIsEditing] = useState<number | null>(null);
    const [newCliente, setNewCliente] = useState<Cliente>({
        codigo: 0,  
        nome: "",
        cpf: "",
        email: "",
        dataDeNascimento: "",
    });

    useEffect(() => {
        const chamadaApiJava = async () => {
            try {
                const response = await fetch("http://localhost:8080/consultar/cliente");
                const data = await response.json();
                setClientes(data);
            } catch (error) {
                console.error("Erro ao buscar clientes:", error);
            }
        };

        chamadaApiJava();
    }, []);

    const handleAdd = async () => {
        try {
            const response = await fetch("http://localhost:8080/consultar/cliente", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newCliente),
            });
            if (response.ok) {
                const clienteAdicionado = await response.json();
                console.log("Cliente adicionado:", clienteAdicionado);
                setClientes(prevClientes => [...prevClientes, clienteAdicionado]);
                setNewCliente({ codigo: 0, nome: "", cpf: "", email: "", dataDeNascimento: "" });
                window.location.reload();
            } else {
                console.error("Erro ao adicionar cliente");
            }
        } catch (error) {
            console.error("Erro ao adicionar cliente:", error);
        }
    };

    
    const handleEdit = (codigo: number) => {
        setIsEditing(codigo);
    };

   
    const handleSave = async (codigo: number) => {
        const clienteEditado = clientes.find(cliente => cliente.codigo === codigo);
        if (!clienteEditado) return;

        try {
            const response = await fetch(`http://localhost:8080/consultar/cliente/${codigo}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(clienteEditado),
            });
            if (response.ok) {
                setIsEditing(null);
            } else {
                console.error("Erro ao editar cliente");
            }
        } catch (error) {
            console.error("Erro ao editar cliente:", error);
        }
    };

    const handleDelete = async (codigo: number) => {
        console.log("Tentando excluir cliente com código:", codigo); 
        try {
            const response = await fetch(`http://localhost:8080/consultar/cliente/${codigo}`, {
                method: "DELETE",
            });
            console.log(`Resposta da API ao excluir cliente ${codigo}:`, response);
            if (response.ok) {
                
                setClientes(prevClientes => prevClientes.filter(cliente => cliente.codigo !== codigo));
                if (isEditing === codigo) {
                    setIsEditing(null);
                }
            } else {
                console.error(`Erro ao excluir cliente: ${response.status} - ${response.statusText}`);
            }
        } catch (error) {
            console.error("Erro ao excluir cliente:", error);
        }
    };

    return (
        <div className="clientes-container">
    <h1 className="clientes-title">Clientes</h1>
    <table className="clientes-table">
        <thead>
            <tr className="clientes-header">
                <th className="clientes-header-cell">Código</th>
                <th className="clientes-header-cell">Nome</th>
                <th className="clientes-header-cell">CPF</th>
                <th className="clientes-header-cell">Email</th>
                <th className="clientes-header-cell">Data de Nascimento</th>
                <th className="clientes-header-cell">Ações</th>
            </tr>
        </thead>
        <tbody>
    {clientes.map(cliente => (
        <tr key={cliente.codigo} className="clientes-row">
            <td className="clientes-cell">{cliente.codigo}</td>
            <td className="clientes-cell">
                {isEditing === cliente.codigo ? (
                    <input
                        type="text"
                        value={cliente.nome}
                        onChange={e =>
                            setClientes(
                                clientes.map(c =>
                                    c.codigo === cliente.codigo
                                        ? { ...c, nome: e.target.value }
                                        : c
                                )
                            )
                        }
                        className="clientes-input"
                    />
                ) : (
                    cliente.nome
                )}
            </td>
            <td className="clientes-cell">
                {isEditing === cliente.codigo ? (
                    <input
                        type="text"
                        value={cliente.cpf}
                        onChange={e =>
                            setClientes(
                                clientes.map(c =>
                                    c.codigo === cliente.codigo
                                        ? { ...c, cpf: e.target.value }
                                        : c
                                )
                            )
                        }
                        className="clientes-input"
                    />
                ) : (
                    cliente.cpf
                )}
            </td>
            <td className="clientes-cell">
                {isEditing === cliente.codigo ? (
                    <input
                        type="email"
                        value={cliente.email}
                        onChange={e =>
                            setClientes(
                                clientes.map(c =>
                                    c.codigo === cliente.codigo
                                        ? { ...c, email: e.target.value }
                                        : c
                                )
                            )
                        }
                        className="clientes-input"
                    />
                ) : (
                    cliente.email
                )}
            </td>
            <td className="clientes-cell">
                {isEditing === cliente.codigo ? (
                    <input
                        type="date"
                        value={cliente.dataDeNascimento}
                        onChange={e =>
                            setClientes(
                                clientes.map(c =>
                                    c.codigo === cliente.codigo
                                        ? { ...c, dataDeNascimento: e.target.value }
                                        : c
                                )
                            )
                        }
                        className="clientes-input"
                    />
                ) : (
                    cliente.dataDeNascimento
                )}
            </td>
            <td className="clientes-cell">
                {isEditing === cliente.codigo ? (
                    <button onClick={() => handleSave(cliente.codigo)} className="clientes-button-save">
                        Salvar
                    </button>
                ) : (
                    <button onClick={() => handleEdit(cliente.codigo)} className="clientes-button-edit">
                        Editar
                    </button>
                )}
                <button onClick={() => handleDelete(cliente.codigo)} className="clientes-button-delete">
                    Excluir
                </button>
            </td>
        </tr>
    ))}
</tbody>
    </table>

    <h2 className="clientes-add-title">Adicionar Novo Cliente</h2>
    <div className="clientes-add-form">
        <input
            type="text"
            placeholder="Nome"
            value={newCliente.nome}
            onChange={e => setNewCliente({ ...newCliente, nome: e.target.value })}
            className="clientes-input"
        />
        <input
            type="text"
            placeholder="CPF"
            value={newCliente.cpf}
            onChange={e => setNewCliente({ ...newCliente, cpf: e.target.value })}
            className="clientes-input"
        />
        <input
            type="email"
            placeholder="Email"
            value={newCliente.email}
            onChange={e => setNewCliente({ ...newCliente, email: e.target.value })}
            className="clientes-input"
        />
        <input
            type="date"
            placeholder="Data de Nascimento"
            value={newCliente.dataDeNascimento}
            onChange={e => setNewCliente({ ...newCliente, dataDeNascimento: e.target.value })}
            className="clientes-input"
        />
        <button onClick={handleAdd} className="clientes-button-add">
            Adicionar
        </button>
    </div>
</div>
    );
}
