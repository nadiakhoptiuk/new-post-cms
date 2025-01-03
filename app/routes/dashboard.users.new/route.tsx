import { useTranslation } from "react-i18next";
import { Box, Container, Text } from "@mantine/core";
import { IconArrowNarrowLeft } from "@tabler/icons-react";

import { StyledLink } from "~/shared/components/ui/StyledLink";
import { EditUserForm } from "~/shared/components/modules/EditUserForm/EditUserForm";
import { NavigationLink } from "~/shared/constants/navigation";

export { action } from "./action";

export const handle = { i18n: ["user", "common"] };

export default function DashBoardCreateUserPage() {
  const { t } = useTranslation("user");

  return (
    <Box component='section'>
      <Container>
        <StyledLink
          to={NavigationLink.DASHBOARD_USERS}
          variant='unstyled'
          style={{ marginBottom: "20px" }}
        >
          <IconArrowNarrowLeft size={18} />
          {t("link.back")}
        </StyledLink>

        <Text
          fw='bold'
          mb={30}
          styles={{ root: { textAlign: "center" } }}
          size='xl'
        >
          {t("title.newUser")}
        </Text>

        <EditUserForm
          userData={{ firstName: "", lastName: "", email: "", role: "user" }}
          formType='create'
        />
      </Container>
    </Box>
  );
}
