import { Request, Response } from "express";
import { pool } from "../../config/db";
import { todoServices } from "./todo.service";

const createTodo = async (req: Request, res: Response) => {
  const { user_id, title } = req.body;
  try {
    const result = await todoServices.createTodo(user_id, title);

    res.status(201).json({
      success: true,
      message: "Todos created successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getTodos = async (req: Request, res: Response) => {
  try {
    const result = await todoServices.getTodos();
    res.status(201).json({
      success: true,
      message: "TODOS fetched successfully...",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getSingleTodo = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const result = await todoServices.getSingleTodo(id as string);
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "TODO not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "TODO fetched successfully.",
        data: result.rows[0],
      });
    }
  } catch (error) {
    res.status(500).json({
      success: true,
      message: "TODOS not found",
    });
  }
};

const updateTodo = async (req: Request, res: Response) => {
  const { title, completed } = req.body;
  const id = req.params.id;
  try {
    const result = await todoServices.updateTodo(title, completed, id!);

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "TODO not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "TODO updated successfully.",
        data: result.rows[0],
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "TODOS not found",
    });
  }
};

const deleteTodo = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const result = await todoServices.deleteTodo(id!);

    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "TODO not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "TODO deleted successfully.",
        data: null,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const todoControllers = {
  createTodo,
  getTodos,
  getSingleTodo,
  updateTodo,
  deleteTodo,
};
