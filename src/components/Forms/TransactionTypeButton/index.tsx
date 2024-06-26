import React from "react";
import { Container, Icon, Title, Button } from "./styles";
import { RectButtonProps } from "react-native-gesture-handler";

const icons = {
  up: "arrow-up-circle",
  down: "arrow-down-circle",
};

interface Props extends RectButtonProps {
  type: "up" | "down";
  title: string;
  isActive: boolean;
}

export function TransactionTypeButton({
  type,
  title,
  isActive,
  ...rest
}: Props) {
  return (
    <Container type={type} isActive={isActive}>
      <Button {...rest}>
        <Icon name={icons[type] as any} type={type} />
        <Title>{title}</Title>
      </Button>
    </Container>
  );
}
