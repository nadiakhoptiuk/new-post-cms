import { useLoaderData } from "react-router";
import { useTranslation } from "react-i18next";
import { Box, Container, Group, Text } from "@mantine/core";
import { IconArrowNarrowLeft } from "@tabler/icons-react";

import { StyledLink } from "~/shared/components/ui/StyledLink";

import { EditUserForm } from "~/shared/components/modules/EditUserForm/EditUserForm";
import { NavigationLink } from "~/shared/constants/navigation";

import type { TUserLoaderData } from "./types";
import { formatDateWithTime } from "~/shared/utils/dateFormat";

export { loader } from "./loader";
export { action } from "./action";

export const handle = { i18n: ["user", "common"] };

export default function DashBoardEditUserPage() {
  const { user } = useLoaderData<TUserLoaderData>();
  const { t } = useTranslation("user");

  const { createdAt, updatedAt, updatedBy, deletedAt, deletedBy, ...userData } =
    user;

  const createdDate = formatDateWithTime(createdAt);
  const updatedDate = formatDateWithTime(updatedAt);
  const deletedDate = formatDateWithTime(deletedAt);

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

        <Box mb={25}>
          <Text mb={15} size='md'>
            <Text component='span' fw='bolder'>
              Created at{"  "}
            </Text>
            {createdDate}
          </Text>

          {updatedDate && updatedBy && (
            <Group>
              <Text mb={15} size='md'>
                <Text component='span' fw='bolder'>
                  Last updated at{"  "}
                </Text>
                {updatedDate}
              </Text>

              <Text mb={15} size='md'>
                <Text component='span' fw='bolder'>
                  Updated by{"  "}
                </Text>
                {updatedBy}
              </Text>
            </Group>
          )}

          {deletedDate && deletedBy && (
            <Group>
              <Text mb={15} size='md'>
                <Text component='span' fw='bolder'>
                  Deleted at{"  "}
                </Text>
                {deletedDate}
              </Text>

              <Text mb={15} size='md'>
                <Text component='span' fw='bolder'>
                  Deleted by{"  "}
                </Text>
                {deletedBy}
              </Text>
            </Group>
          )}
        </Box>

        <EditUserForm
          userData={userData}
          formType='update'
          hasBeenDeleted={!!deletedDate}
        />
      </Container>
    </Box>
  );
}
