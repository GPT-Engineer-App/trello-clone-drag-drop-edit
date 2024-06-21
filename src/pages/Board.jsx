import React, { useState, useEffect } from "react";
import { Box, Button, Input, Text, VStack, useColorMode } from "@chakra-ui/react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import Confetti from "react-confetti";
import { FaPlus } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";

const initialColumns = {
  backlog: {
    name: "Backlog",
    items: [
      { id: "1", content: "As a user I want to create a new account and delete my blog posts." },
      { id: "2", content: "As a user I want to create my personal account." },
    ],
  },
  designSprint: {
    name: "DESIGN SPRINT #7",
    items: [
      { id: "3", content: "Design for the landing page" },
      { id: "4", content: "Design for the My Account section" },
    ],
  },
  devSprint: {
    name: "DEV SPRINT #13",
    items: [
      { id: "5", content: "As a user I want to be able to create new posts from My Dashboard" },
      { id: "6", content: "As an administrator I want to be able to manage my users." },
    ],
  },
  accepted: {
    name: "Accepted",
    items: [
      { id: "7", content: "As a user I want to be able to send a message" },
      { id: "8", content: "As an administrator I want to be able to login, create new account, delete account or merge few accounts together." },
    ],
  },
  completed: {
    name: "Completed",
    items: [
      { id: "9", content: "As a user I want to be able to view my completed tasks." },
      { id: "10", content: "As an administrator I want to be able to archive completed tasks." },
    ],
  }
};

const Board = () => {
  const [columns, setColumns] = useState(initialColumns);
  const [columnOrder, setColumnOrder] = useState(Object.keys(initialColumns));
  const [editingCard, setEditingCard] = useState(null);
  const [newContent, setNewContent] = useState("");
  const [editingColumn, setEditingColumn] = useState(null);
  const [newColumnName, setNewColumnName] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [sourceColumnId, setSourceColumnId] = useState(null);
  const [hoveredColumnId, setHoveredColumnId] = useState(null);
  const [filteredColumns, setFilteredColumns] = useState(columns);
  const [searchParams] = useSearchParams();
  const { colorMode } = useColorMode();

  useEffect(() => {
    const query = searchParams.get("search") || "";
    if (query) {
      const newFilteredColumns = {};
      Object.keys(columns).forEach((columnId) => {
        newFilteredColumns[columnId] = {
          ...columns[columnId],
          items: columns[columnId].items.filter((item) =>
            item.content.toLowerCase().includes(query.toLowerCase())
          ),
        };
      });
      setFilteredColumns(newFilteredColumns);
    } else {
      setFilteredColumns(columns);
    }
  }, [columns, searchParams]);

  const onDragStart = (start) => {
    setIsDragging(true);
    setSourceColumnId(start.source.droppableId);
  };

  const onDragEnd = (result) => {
    setIsDragging(false);
    setSourceColumnId(null);
    setHoveredColumnId(null);
    if (!result.destination) return;

    const { source, destination, type } = result;

    if (type === "COLUMN") {
      const newColumnOrder = Array.from(columnOrder);
      const [removed] = newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, removed);
      setColumnOrder(newColumnOrder);
      return;
    }

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });

      if (destination.droppableId === "completed") {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
      }
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };

  const onDragUpdate = (update) => {
    if (update.destination) {
      setHoveredColumnId(update.destination.droppableId);
    } else {
      setHoveredColumnId(null);
    }
  };

  const handleEdit = (columnId, itemId) => {
    setEditingCard({ columnId, itemId });
    const column = columns[columnId];
    const item = column.items.find((item) => item.id === itemId);
    setNewContent(item.content);
  };

  const handleSave = () => {
    try {
      const { columnId, itemId } = editingCard;
      const column = columns[columnId];
      const updatedItems = column.items.map((item) =>
        item.id === itemId ? { ...item, content: newContent } : item
      );
      setColumns({
        ...columns,
        [columnId]: {
          ...column,
          items: updatedItems,
        },
      });
      setEditingCard(null);
      setNewContent("");
    } catch (error) {
      console.error("Error saving the card:", error);
    }
  };

  const handleCancel = () => {
    try {
      setEditingCard(null);
      setNewContent("");
    } catch (error) {
      console.error("Error cancelling the edit:", error);
    }
  };

  const handleAddTicket = (columnId) => {
    const newTicket = { id: Date.now().toString(), content: "New Ticket" };
    const column = columns[columnId];
    const updatedItems = [newTicket, ...column.items]; // Add new ticket at the top
    setColumns({
      ...columns,
      [columnId]: {
        ...column,
        items: updatedItems,
      },
    });
  };

  const handleColumnEdit = (columnId) => {
    setEditingColumn(columnId);
    setNewColumnName(columns[columnId].name);
  };

  const handleColumnSave = () => {
    if (editingColumn) {
      setColumns({
        ...columns,
        [editingColumn]: {
          ...columns[editingColumn],
          name: newColumnName,
        },
      });
      setEditingColumn(null);
      setNewColumnName("");
    }
  };

  return (
    <Box bg={colorMode === "light" ? "white" : "gray.800"} color={colorMode === "light" ? "black" : "white"}>
      {showConfetti && <Confetti />}
      <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart} onDragUpdate={onDragUpdate}>
        <Droppable droppableId="all-columns" direction="horizontal" type="COLUMN">
          {(provided) => (
            <Box display="flex" {...provided.droppableProps} ref={provided.innerRef} p={4}>
              {columnOrder.map((columnId, index) => {
                const column = filteredColumns[columnId];
                return (
                  <Draggable key={columnId} draggableId={columnId} index={index}>
                    {(provided) => (
                      <Box
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        bg={colorMode === "light" ? "gray.100" : "gray.600"}
                        p={4}
                        borderRadius="md"
                        width="24%"
                        mr={4}
                      >
                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
                          <Text
                            fontSize="xl"
                            {...provided.dragHandleProps}
                            onClick={() => handleColumnEdit(columnId)}
                            color={colorMode === "light" ? "black" : "gray.700"}
                          >
                            {editingColumn === columnId ? (
                              <Input
                                value={newColumnName}
                                onChange={(e) => setNewColumnName(e.target.value)}
                                onBlur={handleColumnSave}
                                onKeyDown={(e) => e.key === "Enter" && handleColumnSave()}
                                autoFocus
                              />
                            ) : (
                              column.name
                            )}
                          </Text>
                          <Button size="sm" onClick={() => handleAddTicket(columnId)} leftIcon={<FaPlus />} />
                        </Box>
                        <Droppable droppableId={columnId} type="TASK">
                          {(provided) => (
                            <VStack
                              {...provided.droppableProps}
                              ref={provided.innerRef}
                              spacing={4}
                              minHeight="200px"
                            >
                              {column.items.map((item, index) => (
                                <Draggable key={item.id} draggableId={item.id} index={index}>
                                  {(provided, snapshot) => (
                                    <Box
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      bg={colorMode === "light" ? "white" : "gray.700"}
                                      color={colorMode === "light" ? "black" : "white"}
                                      p={4}
                                      borderRadius="md"
                                      width="100%"
                                      boxShadow="md"
                                      onClick={(e) => {
                                        if (!e.target.closest('.save-button') && !e.target.closest('.cancel-button')) {
                                          handleEdit(columnId, item.id);
                                        }
                                      }}
                                      onDragStart={onDragStart}
                                      onDragEnd={onDragEnd}
                                      style={{
                                        ...provided.draggableProps.style,
                                        boxShadow: snapshot.isDragging ? "0 4px 8px rgba(0, 0, 0, 0.2)" : "none",
                                        border: snapshot.isDragging ? "2px solid #3182ce" : "none",
                                      }}
                                    >
                                      {editingCard && editingCard.columnId === columnId && editingCard.itemId === item.id ? (
                                        <>
                                          <Input
                                            value={newContent}
                                            onChange={(e) => setNewContent(e.target.value)}
                                            mb={2}
                                            bg={colorMode === "light" ? "white" : "gray.600"}
                                            color={colorMode === "light" ? "black" : "white"}
                                          />
                                          <Button className="save-button" onClick={(e) => { e.stopPropagation(); handleSave(); }} colorScheme="blue" mr={2}>
                                            Save
                                          </Button>
                                          <Button className="cancel-button" onClick={(e) => { e.stopPropagation(); handleCancel(); }}>
                                            Cancel
                                          </Button>
                                        </>
                                      ) : (
                                        <>
                                          <Text>{item.content}</Text>
                                        </>
                                      )}
                                    </Box>
                                  )}
                                </Draggable>
                              ))}
                              {provided.placeholder}
                            </VStack>
                          )}
                        </Droppable>
                      </Box>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
      </DragDropContext>
    </Box>
  );
};

export default Board;