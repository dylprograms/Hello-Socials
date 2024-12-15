import { Request, Response } from 'express';
import { Thought, User } from '../models/index.js';
export const getAllThoughts = async (_req: Request, res: Response) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getThoughtById = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    res.json(thought || { message: 'Thought not found' });
  } catch (err) {
    res.status(500).json(err);
  }
};

export const createThought = async (req: Request, res: Response) => {
  try {
    const { thoughtText, username, userId } = req.body;
    const thought = await Thought.create({ thoughtText, username });
    const user = await User.findByIdAndUpdate(
      userId,
      { $push: { thoughts: thought._id } },
      { new: true }
    );
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const updateThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      req.body,
      { new: true }
    );
    res.json(thought || { message: 'Thought not found' });
  } catch (err) {
    res.status(500).json(err);
  }
};

export const deleteThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findByIdAndDelete(req.params.thoughtId);
    if (!thought) {
      res.status(404).json({ message: 'Thought not found' });
      return;
    }
    await User.findOneAndUpdate(
      { thoughts: req.params.thoughtId },
      { $pull: { thoughts: req.params.thoughtId } }
    );
    res.json({ message: 'Thought deleted' });
  } catch (err) {
    res.status(500).json(err);
  }
};

export const addReaction = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $push: { reactions: req.body } },
      { new: true }
    );
    res.json(thought || { message: 'Thought not found' });
  } catch (err) {
    res.status(500).json(err);
  }
};

export const removeReaction = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $pull: { reactions: { reactionId: req.body.reactionId } } },
      { new: true }
    );
    res.json(thought || { message: 'Thought not found' });
  } catch (err) {
    res.status(500).json(err);
  }
};
